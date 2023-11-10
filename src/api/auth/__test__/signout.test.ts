import request from 'supertest';
import { app } from '../../../../app';

it('clears the cookie after signout', async () => {
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

  const response = request(app)
    .post('/api/v1/users/signout')
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
