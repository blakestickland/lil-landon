const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  region: "ap-southeast-2",
});

console.log("Writing entries to Accessibilities table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const accessibilitiesData = JSON.parse(
  fs.readFileSync("../components/data/accessibility_list.json", "utf8")
);

accessibilitiesData.forEach((accessibility) => {
  const params = {
    TableName: "Accessibilities",
    Item: {
      item: accessibility.item,
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err)
      console.error(
        "Unable to load data into table for accessibility",
        service.service,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", accessibility.item, "to table.");
  });
});
