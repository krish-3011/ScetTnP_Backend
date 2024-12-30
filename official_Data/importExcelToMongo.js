const xlsx = require('xlsx');
const { MongoClient } = require('mongodb');

async function readExcelAndInsertToMongoDB(excelFilePath, mongoUri, dbName, collectionName) {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Connect to MongoDB
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert data into MongoDB
    const result = await collection.insertMany(data);

    console.log(`${result.insertedCount} documents were inserted`);

    // Close the connection
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Define your parameters
const excelFilePath = 'path/to/your/excel/file.xlsx'; // Path to your Excel file
const mongoUri = 'mongodb://localhost:27017'; // Your MongoDB URI
const dbName = 'yourDatabaseName'; // Your database name
const collectionName = 'yourCollectionName'; // Your collection name

// Call the function
readExcelAndInsertToMongoDB(excelFilePath, mongoUri, dbName, collectionName);
