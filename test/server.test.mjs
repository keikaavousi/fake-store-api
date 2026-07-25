import { describe, expect, test } from 'vitest';
import request from 'supertest';
import serverModule from '../server.js';

const { app } = serverModule;

describe('Brad’s Store API', () => {
  test('reports a healthy service', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
