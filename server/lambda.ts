import serverless from 'serverless-http';
import app from './server';

export const main = serverless(app);
