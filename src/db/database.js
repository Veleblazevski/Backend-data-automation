import mysql from 'mysql';
import mysqlConfig from '../../config/mysql';
import models from '../migrations/createTables';
const dbConfig = mysqlConfig['dev'];
const {
    createInstructors,
    createStudents,
    department,
    createCourse,
    courseStudent
} = models;
const con = mysql.createConnection(dbConfig);

con.connect(() => {

    console.log('db connection is on');
    con.query(department);
    con.query(createInstructors);
    con.query(createStudents);
    con.query(createCourse);
    con.query(courseStudent);

});


export default {
    con
};