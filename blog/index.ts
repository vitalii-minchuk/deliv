import express from 'express';
import mongoose from 'mongoose';
import { register } from './controllers/user-controllers';

mongoose
	.connect(
		'mongodb+srv://admin:admin1234@cluster0.7t3i91d.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Server Connected to db'))
	.catch(() => console.log('Server Connected to db Error'));

const app: express.Application = express();

const port: number = 4000;

app.use(express.json());

app.post('/auth/register', register);

app.listen(port, () => {
	console.log(`TypeScript with Expresst: ${port}`);
});
