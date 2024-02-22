import express, { Router, json } from 'express';
import request from 'supertest';
import { authenticate } from '../controllers/authenticate';
import { redeem } from '../controllers/redeem';
import routes from './redeem';


jest.mock('../controllers/redeem', () => ({
  redeem: jest.fn((req, res) => res.sendStatus(200)),
}));

jest.mock('../controllers/authenticate', () => ({
  authenticate: jest.fn((req, res, next) => next()),
}));

describe('routes', () => {
  it('should route POST /redeem to the authenticate controller then to the redeem controller', async () => {
    const router = Router();
    routes(router);

    const app = express();
    app.use(json());
    app.use(router);

    await request(app)
      .post('/redeem')
      .send({ teamName: 'team1', staff_pass_id: '123' })
      .expect(200);

    expect(authenticate).toHaveBeenCalled();
    expect(redeem).toHaveBeenCalled();
  });
});