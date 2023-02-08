import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import ErrorHandler from './middlewares/ErrorHandler';

import siteRoutes from './routes/site/site.route';

import menuRoutes from './routes/api/menu.route';
import authRoutes from './routes/api/auth.route';
import contentRoutes from './routes/api/content.route';

const app: Application = express();

app.use(cors());

dotenv.config();

app.use('/images', express.static(path.join(__dirname, '/images')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** SITE ROUTES */

app.use(siteRoutes);

/** API ROUTES */

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.use(ErrorHandler);

/** */

app.listen(process.env.port as string, () => {
	console.log('App listening on ' + process.env.port + ' port');
});
