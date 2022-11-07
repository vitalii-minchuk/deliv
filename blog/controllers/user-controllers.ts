import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

export const register = async (res: Response, req: Request) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const password = req.body;
		console.log(password);
	} catch (error) {
		console.log(`Error ${error}`);
		res.status(500).json({
			message: 'Register failure',
		});
	}
};
