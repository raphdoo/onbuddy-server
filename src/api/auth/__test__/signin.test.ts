import request from 'supertest';
import { app } from '../../../../app';

it('fails when email does not exist', async () => {
  return request(app)
    .post('/api/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: 'right',
      pricing: 'free',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: 'wrong',
    })
    .expect(400);
});

it('responds with a cookie when given valid credential', async () => {
  await request(app)
    .post('/api/v1/users/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
      pricing: 'free',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234567',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
