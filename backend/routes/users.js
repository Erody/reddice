import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcryptjs';

const router = express.Router();



router.post('/', (req, res) => {
	const { errors, isValid } = validateInput(req.body);
	const db = req.db;
	const collection = db.get('usersCollection');

	if(isValid) {
		const { username, email, password, timezone } = req.body;
		const password_digest = bcrypt.hashSync(password, 10);
		const timestamp = new Date().getTime(); // miliseconds
		collection.insert({ username, email, password_digest, timezone, timestamp })
			.then(x => res.json({ success: true }))
			.catch(err => res.status(500).json({ error: err }));

	} else {
		res.status(400).json(errors);
	}
});

export default router;