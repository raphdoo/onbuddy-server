import request from 'supertest';
import { app } from '../../../../app';

it('returns all users', async () => {
  const cookie = await global.signup('test@test.com');

  const response = await request(app)
    .get('/api/v1/users/index')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
});

// it('responds with 400 if companyId does not exist', async () => {
//   const cookie1 = await global.signup('test1@test.com');
//   const cookie2 = await global.signup('test2@test.com');

//   const response = await request(app)
//     .get('/api/v1/users/index')
//     .set('Cookie', cookie1)
//     .send()
//     .expect(400);
// });
