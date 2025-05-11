import express, { Express } from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(authMiddleware);
app.use(routes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
