var AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-2",
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "HotelServices",
  KeySchema: [
    // Partition Key
    { AttributeName: "service", KeyType: "HASH" },
  ],
  AttributeDefinitions: [
    { AttributeName: "service", AttributeType: "S" },
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
