# Technical Test - Part II

This part is about creating a script named `script.<ext>` in any language of your choice (preferably Python or TS with Node).<br />This script will run at the beginning of each hour to..

## 1. Generate a .txt file

Generate a text file that has the following name format: `yyyy-mm-dd hh-mm-ss.txt`<br />e.g.: `2022-06-02 13-00-00.txt`

## 2. Upload file to GDrive

Upload that file to Google Drive.<br />Retry after 5 seconds if there is a network error (offline, or slow internet connection, ..).

## 3. Dump logs in a .log file

Dump logs in a `script.log` file before and after generating and uploading the file with the datetime of each step.<br />e.g.:

```txt
<yyyy-mm-dd hh:mm:ss> | Generating text file..
<yyyy-mm-dd hh:mm:ss> | <yyyy-mm-dd hh-mm-ss.txt> file generated successfully
<yyyy-mm-dd hh:mm:ss> | Uploading text file..
<yyyy-mm-dd hh:mm:ss> | File uploaded successfully
```

or, in case of a network error:

```txt
<yyyy-mm-dd hh:mm:ss> | Generating text file..
<yyyy-mm-dd hh:mm:ss> | <yyyy-mm-dd hh-mm-ss.txt> file generated successfully
<yyyy-mm-dd hh:mm:ss> | Uploading text file..
<yyyy-mm-dd hh:mm:ss> | Couldn't upload because of a network error, retrying in 5 seconds..
<yyyy-mm-dd hh:mm:ss> | Uploading text file..
<yyyy-mm-dd hh:mm:ss> | File uploaded successfully
```

You must keep the old logs and append to the file when reruning the script.
