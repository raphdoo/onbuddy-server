import request from 'supertest';
import { app } from '../../../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(201);
});

it('returns a 400 with an invalid credential', async () => {
  return request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'l',
      companyName: 'es',
      email: 'test.com',
      password: '1234567',
    })
    .expect(400);
});

it('returns a 400 with a missing credential', async () => {
  await request(app)
    .post('/api/v1/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/users/signup')
    .send({
      password: '1234567',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/users/signup')
    .send({
      companyName: 'companyName',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
    })
    .expect(400);

  await request(app)
    .post('/api/v1/users/signup')
    .send({
      lastname: 'lastname',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
