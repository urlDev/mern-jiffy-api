const request = require('supertest');
const app = require('../src/app');
const Favorite = require('../src/models/favorite');
const {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  setupDatabase,
  favOne,
  favTwo,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should add gif to favorites', async () => {
  const response = await request(app)
    .post('/:slug')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ id: 'abc1234test' })
    .expect(201);

  const favorite = await Favorite.findById(response.body._id);
  expect(favorite.id).toBe(response.body.id);
  expect(favorite).not.toBeNull();
});

test('Should get userOnes favorites', async () => {
  const response = await request(app)
    .get('/')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(1);
});

test('Should get individual gif', async () => {
  await request(app)
    .get(`/${favOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const favorite = await Favorite.findById(favOne._id);
  expect(favorite).not.toBeNull();
});

test('Should delete authenticated users favorite gif', async () => {
  await request(app)
    .delete(`/${favOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const favorite = await Favorite.findById(favOne._id);
  expect(favorite).toBeNull();
});

test('Should not delete other users favorite gif', async () => {
  await request(app)
    .delete(`/${favTwo._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404);

  const favorite = await Favorite.findById(favTwo._id);
  expect(favorite).not.toBeNull();
});
