import { Router } from 'express';
import actions from './actions';

const { insertID, checkStudents } = actions;

const courseStudentRouter = Router();
courseStudentRouter.post('/student/course', insertID);
courseStudentRouter.get('/student/check/:id', checkStudents);


export default courseStudentRouter;