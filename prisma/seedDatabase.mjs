import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/Brads-store';
const client = new MongoClient(uri);

const apiURL = 'https://fakestoreapi.com/products';

async function seedData() {
  try {
    await client.connect();
    const database = client.db('Brads-store'); 
    const collection = database.collection('products');

    const response = await fetch(apiURL);
    const data = await response.json();

    await collection.insertMany(data);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seedData();
