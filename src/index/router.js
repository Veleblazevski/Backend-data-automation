import { Router } from '../../node_modules/express';
import instructors from '../instructors/index';
import posts from '../students/index';
import department from '../department/index';
import course from '../course/index';
import students from '../students/index';
import courseStudent from '../courseStudent/index'

const indexRouter = Router();
const instructorRouter = instructors.routes;
const courseRouter = course.routes;
const departmentRouer = department.routes;
const studentRouter = students.routes;
const courseSR = courseStudent.routes;

indexRouter.use(departmentRouer);
indexRouter.use(instructorRouter);
indexRouter.use(courseRouter);
indexRouter.use(studentRouter);
indexRouter.use(courseSR);

export default indexRouter;