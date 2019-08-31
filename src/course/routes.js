import { Router } from 'express';
import actions from './actions';
import course from '.';

const { create, getOneCourseByID, del, list, update } = actions;

const courseRouter = Router();
courseRouter.post('/course/create', create);
courseRouter.get('/course/:id', getOneCourseByID);
courseRouter.delete('/course/:id', del);
courseRouter.get('/course', list);
courseRouter.put('/course/:id', update);
export default courseRouter;