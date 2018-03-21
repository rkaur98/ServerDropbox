# ServerDropbox

Created mini dropbox using S3, DynamoDB and Serverless framework.

If a new file is added to S3 bucket a record of this is added to DynamoDB database. If a file is deleted a record of the files deletion is added to DynamoDB database.

API link to track record in database: https://208qln7b45.execute-api.us-east-2.amazonaws.com/dev/filestrack-endpoint

![serdropbox](https://user-images.githubusercontent.com/24903839/37733509-809b621a-2d05-11e8-8a52-afd8c6ffc481.png)
