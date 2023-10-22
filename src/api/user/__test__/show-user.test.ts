import request from 'supertest';
import { app } from '../../../../app';
import { response } from 'express';

it('show user details', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({
      firstname: 'firstname',
      lastname: 'lastname',
      companyName: 'companyName',
      email: 'test@test.com',
      password: '1234567',
      pricing: 'free',
    })
    .expect(201);

  const userResponse = await request(app)
    .get(`/api/v1/users/${response.body.id}`)
    .set('Cookie', response.get('Set-Cookie'))
    .send()
    .expect(200);

  expect(userResponse.body.email).toEqual('test@test.com');
});
