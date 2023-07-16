import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uriDb = process.env.DB_HOST;

const connectToTestDatabase = async () => {
  try {
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to test database');
  } catch (error) {
    console.error('Error connecting to test database:', error);
  }
};
test('placeholder test', () => {
  expect(true).toBe(true);
});

afterAll(async () => {
  // Zamknięcie połączenia z bazą danych
  console.log('database connection closed');
  await mongoose.connection.close();
});

export default connectToTestDatabase;
