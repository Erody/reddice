import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../server';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = express.Router();

router.post('/', (req, res) => {
	const users = db.get('usersCollection');
	const { identifier, password } = req.body;
	users.find({
		 $or: [{username: identifier}, {email: identifier}]
	}).then( arr => {
		const user = arr[0];
		if(user) {
			if(bcrypt.compareSync(password, user.password_digest)) {
				const token = jwt.sign({
					id: user._id,
					username: user.username,
				}, config.jwtSecret);
				res.json({ token });
			} else {
				res.status(401).json({ errors: { form: 'Incorrect password.' }})
			}
		} else {
			res.status(401).json({ errors: { form: 'No user found with this identifier.' }})
		}
	})
});

export default router;