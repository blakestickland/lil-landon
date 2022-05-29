const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  region: "ap-southeast-2",
});

console.log("Writing entries to MenuLinks table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const menuLinksData = JSON.parse(
  fs.readFileSync("../components/data/menu_links.json", "utf8")
);

menuLinksData.forEach((item) => {
  const params = {
    TableName: "MenuLinks",
    Item: {
      class: item.class,
      href: item.href,
      text: item.text,
    },
  };

  dynamodb.put(params, (err, data) => {
    if (err)
      console.error(
        "Unable to load data into table for menu links",
        item.href,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", item.text, "to table.");
  });
});
