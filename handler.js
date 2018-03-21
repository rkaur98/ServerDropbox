'use strict';
let AWS = require('aws-sdk'),
s3 = new AWS.S3({params: {Bucket: 'dropbox-bucket1', Region: 'us-east-2'}}),
documentClient = new AWS.DynamoDB.DocumentClient(); 


module.exports.filestrack = (event, context, callback) => {
  
  let params = {
    TableName : "dropbox-file-table1"
  };
  
  documentClient.scan(params, function(err, data){
    if (err) callback(err, null);
    else callback(null, data);
    
  });

};

module.exports.postprocess = (event) => {

  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const filesize = record.s3.object.size;
    const eventtime = record.eventTime;
    const eventname = record.eventName;
    const date = eventtime.substr(0, 10);
    const time = eventtime.substr(11,8);
    const event = eventname.split(":");
    
  let params = {
    TableName : "dropbox-file-table1",
    Item : {
      "fileName" : filename,
      "filesize": filesize,
      "eventtime": time,
      "Date": date,
      "eventname": event[0]
    }
    
  };
  documentClient.put(params, function(err, data){
    callback(err, "DynamoDB updated");
  });
  });
};

