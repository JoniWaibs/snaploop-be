import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import authRoutes from '@routes/auth';
import axios from 'axios';

import cookie from '@fastify/cookie';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Auth Routes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = Fastify({
      logger: false,
    });

    app.decorate('jwt', {
      sign: jest.fn().mockReturnValue('t'),
      options: {
        decode: {},
        sign: {},
        verify: {},
      },
      verify: jest.fn(),
      decode: jest.fn(),
      lookupToken: jest.fn(),
    });

    app.decorate('googleOAuth2', {
      getAccessTokenFromAuthorizationCodeFlow: jest.fn().mockResolvedValue({
        token: {
          access_token: 't',
        },
      }),
      getNewAccessTokenUsingRefreshToken: jest.fn(),
      generateAuthorizationUri: jest.fn(),
      revokeToken: jest.fn(),
      revokeAllToken: jest.fn(),
      userinfo: jest.fn(),
    });

    app.decorate(
      'authenticate',
      jest.fn().mockImplementation(async (request, reply) => {
        request.user = { email: 'test@example.com', name: 'Test User' };
      })
    );

    await app.register(cookie);
    app.register(authRoutes);

    await app.ready();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /google/callback', () => {
    test('should successfully authenticate a user and set a cookie', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        status: 200,
        headers: {
          location: 'http://localhost:3000/albums',
        },
        data: {
          email: 'test@example.com',
          name: 'Test User',
          picture: 'https://example.com/picture.jpg',
        },
      });

      process.env.FRONTEND_URL = 'http://localhost:3000';
      process.env.GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

      const response = await app.inject({
        method: 'GET',
        url: '/google/callback',
      });

      expect(app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledWith('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: 'Bearer t',
        },
      });
      expect(app.jwt.sign).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://example.com/picture.jpg',
      });
      expect(response.statusCode).toBe(302);
      expect(response.headers.location).toBe('http://localhost:3000/albums');
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie']![0]).toContain('t');
    });
    test('should handle error when token is not available', async () => {
      app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow = jest.fn().mockResolvedValue({
        token: null,
      });

      const response = await app.inject({
        method: 'GET',
        url: '/google/callback',
      });

      expect(response.statusCode).toBe(401);
      expect(response.json()).toEqual({ error: 'Unauthorized' });
    });

    test('should handle error when user info is not available', async () => {
      mockedAxios.get.mockResolvedValueOnce(null);

      const response = await app.inject({
        method: 'GET',
        url: '/google/callback',
      });

      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({ error: 'User info not found from Google' });
    });

    test('should handle server errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const response = await app.inject({
        method: 'GET',
        url: '/google/callback',
      });

      expect(response.statusCode).toBe(500);
      expect(response.json()).toEqual({ error: 'Internal server error' });
    });
  });

  describe('GET /logout', () => {
    test('should clear the token cookie and return success message', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/logout',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ message: 'Session closed' });
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie']![0]).toContain('t');
    });
  });
});
