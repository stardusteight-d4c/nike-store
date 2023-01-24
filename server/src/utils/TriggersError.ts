import { FastifyReply } from "fastify";

export class TriggersError {
  constructor(error: any, reply: FastifyReply) {
    console.error(error);
    return reply.status(500).send({
      status: false,
      message: error.message,
    });
  }
}
