const fs = require("fs");
const path = require("path");

// Path to the data.json file located in ../data/
const filePath = path.resolve(__dirname, "../data/db.json");

// Function to read data from data.json
const readData = () => {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading data file:", error);
    return null;
  }
};

// Function to write data to data.json
const writeData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Data successfully written to file");
  } catch (error) {
    console.error("Error writing data file:", error);
  }
};

// Example update operation
const updateData = () => {
  const data = readData();
  if (data) {
    console.log("Data read from file:", data);
    writeData(data);
  }
};

// Run the update
updateData();
