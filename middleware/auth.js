require('dotenv').config();
import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
	try {
		const token = req.headers.Authorization.split(' ')[1]; // token is 1st position after split
		let decodeData;
		if (token) {
			decodeData = jwt.verify(token, process.env.SECRET);
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		next();
	} catch (err) {
		res.json({ err: err.message });
	}
};

module.exports = auth;
