const request = require('supertest');
const app = require('../../server/server');
const newProduct = require('../data/new-product.json');

let firstProduct;

it('POST /product', async () => {
  const response = await request(app).post('/product').send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name); // 필수값 체크
  expect(response.body.description).toBe(newProduct.description); // 필수값 체크
});

it('should return 500 on POST /product', async () => {
  const response = await request(app).post('/product').send({ name: 'phone' }); // 한 값만 필어온 경우 ...
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message: 'Product validation failed: description: Path `description` is required.',
  });
});

it('GET /product/list', async () => {
  const response = await request(app).get('/product/list');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it('GET /product/:productId', async () => {
  const response = await request(app).get(`/product/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it('GET id doenst exist /product/:productId', async () => {
  const response = await request(app).get('/product/5f5cb1f145b82ecaf43e3877');
  expect(response.statusCode).toBe(404);
});

it('PUT /product/:productId', async () => {
  const res = await request(app)
    .put(`/product/${firstProduct._id}`)
    .send({ name: 'updated name', description: 'updated desription' });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe('updated name');
  expect(res.body.description).toBe('updated desription');
});

it('should return 404 on PUT /product/:productId', async () => {
  const res = await request(app)
    .put('/product/' + '5f5d79abdc3acb1b95e0eb99')
    .send({ name: 'updated name', description: 'updated desription' });
  expect(res.statusCode).toBe(404);
});

it('DELETE /product/:productId', async () => {
  const res = await request(app).delete(`/product/${firstProduct._id}`).send();
  expect(res.statusCode).toBe(200);
});

it('DELETE id doenst exist /product/:productId', async () => {
  const res = await request(app).delete(`/product/${firstProduct._id}`).send();
  expect(res.statusCode).toBe(404);
});
