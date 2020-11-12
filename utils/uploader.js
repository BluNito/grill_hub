const aws = require("aws-sdk");
const moment = require("moment");
const { awsAccessKey, awsSecretKey, s3Bucket } = require("../config/keys");
const fs = require("fs");
const path = require("path");

const s3 = new aws.S3({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
});

const uploadFile = async (file) => {
  const params = {
    Bucket: s3Bucket,
    Key: `${Date.now()}.jpg`,
    ContentType: "image/jpeg",
    Body: file.buffer,
    ACL: "public-read-write",
  };
  try {
    const res = await s3.upload(params).promise();
    return res.Location;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = {
  uploadFile,
};
