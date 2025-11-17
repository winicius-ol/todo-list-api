import express from 'express'
import { Router, Request, Response } from 'express';
import CreateTaskController from '@/controller/CreateTaskController';
import GetTasksController from '@/controller/GetTasksController';
import EditTaskController from '@/controller/EditTaskController';
import DeleteTaskController from '@/controller/DeleteTaskController';
import UpsertDueDateDependencyController from '@/controller/UpsertDueDateDependencyController';
import GetDueDateDependenciesController from '@/controller/GetDueDateDependenciesController';
import DeleteDueDateDependencyController from '@/controller/DeleteDueDateDependencyController';

const app = express();
const route = Router()

app.use(express.json())

route.get('/tasks', (req: Request, res: Response) => new GetTasksController().execute(req, res))
route.post('/task', (req: Request, res: Response) => new CreateTaskController().execute(req, res))
route.put('/task/:taskId', (req: Request, res: Response) => new EditTaskController().execute(req, res))
route.delete('/task/:taskId', (req: Request, res: Response) => new DeleteTaskController().execute(req, res))

route.get('/due-date-dependencies', (req: Request, res: Response) => new GetDueDateDependenciesController().execute(req, res))
route.put('/due-date-dependency', (req: Request, res: Response) => new UpsertDueDateDependencyController().execute(req, res))
route.delete('/due-date-dependency/:parentId/:childId', (req: Request, res: Response) => new DeleteDueDateDependencyController().execute(req, res))

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript Hehehe' })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
