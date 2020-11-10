const aws = require("aws-sdk");
const moment = require("moment");
const keys = require("../config/keys");
const fs = require("fs");
const path = require("path");

aws.config.setPromisesDependency();
aws.config.update({
  //continue here!!
});
