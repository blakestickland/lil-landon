const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
    region: "ap-southeast-2"
});

console.log("Writing entries to HotelServices table.");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const servicesData = 
    JSON.parse(fs.readFileSync("../components/data/hotel_services.json", "utf8"));

servicesData.forEach((service) => {
    const params = {
        TableName: "HotelServices",
        Item: { 
            "service": service.service
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err)
            console.error("Unable to load data into table for accessibility",
                            service.service, ". Error: ", JSON.stringify(err, null, 2))
        else 
            console.log("Added", service.service, "to table.");
    })
});
