var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2",
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "Accessibilities",
    KeySchema: [
        // Partition Key
        { AttributeName: "item", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "item", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    },
};

dynamodb.createTable(params, (err, data) => {
  if (err)
    console.error("Unable to create table", JSON.stringify(err, null, 2));
  else
    console.log(
      "Created table with description: ",
      JSON.stringify(data, null, 2)
    );
});
