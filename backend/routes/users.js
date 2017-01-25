import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcryptjs';
import { db } from '../server';
import isEmpty from 'lodash/isEmpty';

const router = express.Router();

function validateInput(data, otherValidations) {
	let { errors } = otherValidations(data);
	const users = db.get('usersCollection');

	return users.find({ $or: [ {email: data.email }, { username: data.username } ]}).then(arr => {
		const user = arr[0];
		if(user) {
			if(user.username === data.username) {
				errors.username = 'This username is already in use.'
			}
			if(user.email === data.email) {
				errors.email = 'This email is already in use.'
			}
		}
		return {
			errors,
			isValid: isEmpty(errors)
		}
	});
}

router.get('/:identifier', (req, res) => {
	const users = db.get('usersCollection');
	users.find({
		$or: [ {email: req.params.identifier}, {username: req.params.identifier} ]},
		{email: 1, username: 1, _id: 0 }) // only return email and username fields
			.then(arr => {
				const user = arr[0];
				res.json({ user });
			})
});

router.post('/', (req, res) => {
	validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
		const users = db.get('usersCollection');
		if(isValid) {
			const { username, email, password, timezone } = req.body;
			const password_digest = bcrypt.hashSync(password, 10);
			const timestamp = new Date().getTime(); // miliseconds
			users.insert({ username, email, password_digest, timezone, timestamp })
				.then(x => res.json({ success: true }))
				.catch(err => res.status(500).json({ error: err }));

		} else {
			res.status(400).json(errors);
		}
	})
});

export default router;