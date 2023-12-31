import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

let mongo: any;
declare global {
  var signup: (mail: string) => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfe';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

// Helper function for handling signup
global.signup = async (mail: string) => {
  const firstname = 'firstname';
  const lastname = 'lastname';
  const companyName = 'companyName';
  const email = mail;
  const password = 'right';
  const pricing = 'Standard';

  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({ firstname, lastname, companyName, email, password, pricing })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
