import request from 'supertest';
import { app } from '../../../../app';
import { Company } from '../../../models/company';
import { User } from '../../../models/user';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
      pricing: 'Standard',
    })
    .expect(201);
});

it('creates a company model when successful', async () => {
  const email = 'test@gmail.com';

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email,
      password: '1234567',
      pricing: 'Standard',
    })
    .expect(201);

  const company = await Company.findOne({ email });

  expect(company!.email).toEqual(email);
});

it('creates a user when successful', async () => {
  const email = 'test@gmail.com';

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email,
      password: '1234567',
      pricing: 'Standard',
    })
    .expect(201);

  const user = await User.findOne({ email });

  expect(user!.email).toEqual(email);
});

it('returns a 400 with an invalid credential', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'l',
      companyName: 'es',
      email: 'test.com',
      password: '1234567',
      pricing: '',
    })
    .expect(400);
});

it('returns a 400 with a missing credential', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      password: '1234567',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      companyName: 'companyName',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      lastname: 'lastname',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      pricing: 'Standard',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
      pricing: 'Standard',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
      pricing: 'Standard',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
      pricing: 'Standard',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
