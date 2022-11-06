import express from 'express';
import { json } from 'body-parser';

const app: express.Application = express();

const port: number = 4000;

app.use(json());

app.post('/auth/register', (_req, _res) => {
	console.log(_req.body);
	_res.send(_req.body);
});

app.listen(port, () => {
	console.log(`TypeScript with Expresst: ${port}`);
});
