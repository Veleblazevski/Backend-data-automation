import { Router } from 'express';
import actions from './actions';

const { create, get, listBydepartment, del, update, list, courseByInstr } = actions;

const instructorRouter = Router();
instructorRouter.post('/instructor/register', create);
instructorRouter.get('/instructor', list);
instructorRouter.get('/instructor/:id', get);
instructorRouter.delete('/instructor/:id', del);
instructorRouter.put('/instructor/:id', update);
instructorRouter.get('/instructor/:departmentName', listBydepartment);
instructorRouter.get('/instructor/course/:id', courseByInstr);
export default instructorRouter;