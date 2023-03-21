import express from 'express';
import cors from 'cors';
import { router as phonesRouter } from '../src/routes/phones';
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', phonesRouter);

app.listen(port, () => {
  console.info(`API is ready on http://localhost:${port} 🚀🚀🚀`);
});
