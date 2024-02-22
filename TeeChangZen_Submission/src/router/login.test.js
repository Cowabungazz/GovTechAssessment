
import express from 'express';
import request from 'supertest';
import { login } from '../controllers/login';
import routes from './login';

jest.mock('../controllers/login', () => ({
  login: jest.fn((req, res) => res.sendStatus(200)),
}));

describe('routes', () => {
  it('should route POST /login to the login controller', async () => {
    const router = express.Router();
    routes(router);

    const app = express();
    app.use(router);

    await request(app)
      .post('/login')
      .expect(200);

    expect(login).toHaveBeenCalled();
  });
});