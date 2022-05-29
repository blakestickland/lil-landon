const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  region: "ap-southeast-2",
});

console.log("Writing entries to Gallery Images table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const galleryData = JSON.parse(
  fs.readFileSync("../components/data/welcome_gallery.json", "utf8")
);

galleryData.forEach((image) => {
    let className = image.className;
    if (className.trim() === "")
        className="no_class";

    const params = {
        TableName: "WelcomeGallery",
        Item: {
        "className": className,
        "src": image.src,
        "alt": image.alt,
        },
    };

  dynamodb.put(params, (err, data) => {
    if (err)
      console.error(
        "Unable to load data into table for Welcome Gallery Images Table",
        image.alt,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    else console.log("Added", image.alt, "to table.");
  });
});
