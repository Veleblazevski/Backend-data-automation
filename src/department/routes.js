import { Router } from 'express';
import actions from './actions';

const { create, get, list, del, update } = actions;

const departmentRouter = Router();
departmentRouter.post('/department/register', create);
departmentRouter.get('/department', list);
departmentRouter.get('/department/:id', get);
departmentRouter.delete('/department/:id', del);
departmentRouter.put('/department/:id', update);
// userRouter.post('/login', login);
// userRouter.get('/users/:userId/posts', listUserPosts);

export default departmentRouter;