const cron = require("node-cron");
const fs = require("fs");
const { google } = require("googleapis");
const logger = require("./utils/logging");
const path = require("path");
const { formatDate } = require("./utils/date");
//gdrive utils
const initDrive = () => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID || "",
      process.env.CLIENT_SECRET | "",
      process.env.REDIRECT_URL | "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({ refresh_token: "blabla" });
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
    return drive;
  } catch (error) {}
};

let drive;

const uploadFile = async (title, type) => {
  const filePath = path.join(__dirname, `${title}.txt`);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: title,
        mimeType: type,
      },
      media: {
        mimeType: type,
        body: fs.createReadStream(filePath),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

cron.schedule("*/30 * * * * *", async () => {
  //create a file
  const title = formatDate(new Date());
  //file creationD
  logger.info(` ${formatDate(new Date())} | Generating text file`);
  fs.writeFile(`${title}.txt`, "Hello Hortensia", (err) => {
    if (err) console.log(err);
  });
  logger.info(
    ` ${formatDate(new Date())} | ${title}  file generated successfully`
  );

  try {
    logger.info(` ${formatDate(new Date())} | Uploading text file..`);
    drive = drive || initDrive();
    await uploadFile(title, "text/plain");
    logger.info(` ${formatDate(new Date())} | file uploaded successfully`);
  } catch (error) {
    //do it again after 5 seconds
    logger.error(
      ` ${formatDate(
        new Date()
      )} | Couldn't upload because of a network error,retrying in 5 seconds..`
    );
    setTimeout(() => {
      exports.uploadFile(title, "text/plain");
    }, 5000);
  }
});
