import express from 'express';
import mongodb from 'mongodb';
import monk from 'monk';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';

const app = express();
app.use(bodyParser.json());
// need to start mongodb first for this to work
export const db = monk('localhost:27017/reddice');

app.use((req, res, next) => {
	req.db = db;
	next();
});
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

app.listen(8080, () => console.log('Listening on localhost:8080'));