import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { LoginUserFromGoogleUseCase } from '@application/use-cases/LoginUserFromGoogleUseCase';
import { AuthController } from '@infrastructure/http/controllers/Auth';
import { PrismaUserRepository } from '@infrastructure/persistance/PrismaUserRepository';
import { PrismaClient } from '@prisma/client';

export default async function authRoutes(fastify: FastifyInstance) {
  const prisma = new PrismaClient();
  const userRepository = new PrismaUserRepository(prisma);
  const loginUserFromGoogleUseCase = new LoginUserFromGoogleUseCase(userRepository);
  const authController = new AuthController(loginUserFromGoogleUseCase);

  fastify.get('/google/callback', async (request: FastifyRequest, reply: FastifyReply) => {
    return authController.googleCallback(request, reply);
  });

  fastify.get('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    return authController.logout(request, reply);
  });
}
