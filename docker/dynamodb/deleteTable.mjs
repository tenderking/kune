import pkg from "aws-sdk";
const { config, DynamoDB } = pkg;
// Set the region
config.update({
	region: "localhost",
	endpoint: "http://localhost:8000",
});

// Create the DynamoDB service object
const ddb = new DynamoDB({ apiVersion: "22-01-2023" });

const tableName = "ServicesWithPKSK";

ddb.deleteTable({ TableName: tableName }, function (err, data) {
	if (err && err.code === "ResourceNotFoundException") {
		console.log("Error: Table not found");
	} else if (err && err.code === "ResourceInUseException") {
		console.log("Error: Table in use");
	} else {
		console.log("Success", data);
	}
});
