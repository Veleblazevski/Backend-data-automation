import express from '../node_modules/express';
import bodyParser from '../node_modules/body-parser';
import helmet from '../node_modules/helmet';
import logger from '../node_modules/morgan';
import cors from '../node_modules/cors/lib';
import unless from 'express-unless';
import jwt from 'express-jwt';
import database from './db/database';
import indexRouter from './index/router';




const { con } = database;

import messagesDB from './migrations/createTables';
const { messages } = messagesDB;


const app = express();
const server = require('http').createServer(app);




server.listen(process.env.PORT || 3001);
console.log('Server Running...');


const publicPaths = ['/login', '/sing-up'];

app.use(logger('dev'));
app.use(cors());
app.use(helmet()); // helps you secure your Express apps by setting various HTTP headers
app.use(bodyParser.urlencoded({
    extended: true
}));

// basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
app.use(bodyParser.json({ type: '*/*' })); // basically tells the system that you want json to be used
//app.use(jwt({ secret: 'aaaa' }).unless({ path: publicPaths }));
app.use(indexRouter);