import Fastify from 'fastify';

import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

import { Server } from '../../src/infrastructure/http/Server.js';

// Mock dependencies
jest.mock('fastify', () => {
  return jest.fn(() => ({
    listen: jest.fn().mockResolvedValue(undefined),
    log: {
      info: jest.fn(),
    },
  }));
});

jest.mock('../../src/infrastructure/http/server.js', () => {
  return {
    Server: jest.fn().mockImplementation(() => ({
      run: jest.fn().mockResolvedValue(undefined),
    })),
  };
});

describe('Main application', () => {
  let originalMain;

  beforeEach(() => {
    // Store original exports
    originalMain = global.main;

    // Clear mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original exports
    global.main = originalMain;

    // Restore mocks
    jest.restoreAllMocks();
  });

  it('should initialize Fastify with logger enabled', async () => {
    // Import the module to trigger the IIFE
    await import('../../src/index.js');

    expect(Fastify).toHaveBeenCalledWith({
      logger: true,
    });
  });

  it('should create a new Server instance and run it', async () => {
    // Import the module to trigger the IIFE
    await import('../../src/index.js');

    const fastifyInstance = Fastify();

    expect(Server).toHaveBeenCalledWith(fastifyInstance);
    expect(Server.mock.results[0].value.run).toHaveBeenCalled();
  });
});
