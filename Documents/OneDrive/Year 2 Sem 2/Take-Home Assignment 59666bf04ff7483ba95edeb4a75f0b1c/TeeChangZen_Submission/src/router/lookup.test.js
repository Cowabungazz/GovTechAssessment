import express, { Router } from 'express';
import request from 'supertest';
import { authenticate } from '../controllers/authenticate';
import { lookup } from '../controllers/lookup';
import routes from './lookup';


jest.mock('../controllers/lookup', () => ({
  lookup: jest.fn((req, res) => res.sendStatus(200)),
}));

jest.mock('../controllers/authenticate', () => ({
  authenticate: jest.fn((req, res, next) => next()),
}));

describe('routes', () => {
  it('should route GET /lookup/:StaffID to the authenticate controller then to the lookup controller', async () => {
    const router = Router();
    routes(router);

    const app = express();
    app.use(router);

    await request(app)
      .get('/lookup/123')
      .expect(200);

    expect(authenticate).toHaveBeenCalled();
    expect(lookup).toHaveBeenCalled();
  });
});