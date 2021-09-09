require('dotenv').config();
import jwt, { decode } from 'jsonwebtoken';
const { SECRET } = process.env;

const auth = async (req, res, next) => {
	try {
		const token = req.headers.Authorization.split(' ')[1]; // token is 1st position after split
		let decodeData;
		if (token) {
			decodeData = jwt.verify(token, SECRET);
			req.userId = decodedData?.id;
		}
		next();
	} catch (err) {
		res.json({ err: err.message });
	}
};

module.exports = auth;
