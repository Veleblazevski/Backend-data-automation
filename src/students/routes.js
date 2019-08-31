import { Router } from 'express';
import actions from './actions';

const { create } = actions;

const studentRouter = Router();
studentRouter.post('/sing-up/student', create);
// userRouter.get('/users', list);
// userRouter.get('/users/:id', get);
// userRouter.delete('/users/:id', del);
// userRouter.put('/users/:id', update);
// userRouter.post('/login', login);
// userRouter.get('/users/:userId/posts', list);

export default studentRouter;