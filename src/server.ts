import express from 'express'
import { Router, Request, Response } from 'express';
import CreateTaskController from '@/controller/CreateTaskController';

const app = express();
const route = Router()

app.use(express.json())

route.post('/task', (req: Request, res: Response) => new CreateTaskController().execute(req, res))

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript Hehehe' })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
