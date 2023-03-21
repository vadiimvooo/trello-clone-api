import express from 'express';
import cors from 'cors';
import { router as listRouter } from '../src/routes/lists';
import { router as taskRouter } from '../src/routes/tasks';
const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/lists', listRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.info(`API is ready on http://localhost:${port} 🚀🚀🚀`);
});
