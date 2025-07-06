import type { FastifyRequest, FastifyReply } from 'fastify';
import { promises as fs } from 'fs';
import { resolve } from 'path';

const { readFile } = fs;

export const healthCheck = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const indexHtmlPath = resolve('static/index.html');
  const indexHtmlContent = await readFile(indexHtmlPath);
  reply
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(indexHtmlContent);
};