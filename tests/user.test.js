const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const Favorite = require('../src/models/favorite');
const { userOneId, userOne, setupDatabase, favOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/profile/register')
    .send({
      name: 'Can',
      email: 'can@example.com',
      password: 'cookies',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'Can',
      email: 'can@example.com',
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe('cookies');
});

test('Should log in existing user', async () => {
  const response = await request(app)
    .post('/profile/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.tokens[1].token).toBe(response.body.token);
});

test('Should not log in user with bad credentials', async () => {
  await request(app)
    .post('/profile/login')
    .send({
      email: 'test@test.com',
      password: 'abcabcabc',
    })
    .expect(400);
});

test('Should get user profile', async () => {
  await request(app)
    .get('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get unauthenticated user', async () => {
  await request(app).get('/profile').send().expect(401);
});

test('Should update authenticated user', async () => {
  await request(app)
    .patch('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'John',
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe('John');
});

test('Should not update unauthenticated user', async () => {
  await request(app)
    .patch('/profile')
    .send({
      name: 'John',
    })
    .expect(401);
});

test('Should not update authenticated users invalid fields', async () => {
  await request(app)
    .patch('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Earth',
    })
    .expect(400);
});

test('Should delete authenticated user', async () => {
  await request(app)
    .delete('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete unauthenticated user', async () => {
  await request(app).delete('/profile').send().expect(401);
});

test('Should delete favorites when authenticated user is deleted', async () => {
  await request(app)
    .delete('/profile')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const favorite = await Favorite.findById(favOne._id);
  expect(favorite).toBeNull();
});
