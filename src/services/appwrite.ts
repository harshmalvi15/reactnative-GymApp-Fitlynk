import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // or your self-hosted Appwrite URL
  .setProject('harsh1511'); // ← replace with your actual Project ID

const account = new Account(client);

export { account, ID }; // ✅ Make sure ID is exported here
