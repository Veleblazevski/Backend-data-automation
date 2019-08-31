import database from '../db/database';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const { con } = database;

const selectCourse = `INSERT INTO course_student (courseId,studentId) VALUES (?,?)`;
const studentId = `SELECT idStudent FROM students`;
const courseId = `SELECT idCourse FROM course`;
const checkForInstructorStudents = `SELECT firstName,name FROM students JOIN course_student ON course_student.studentId = students.idStudent JOIN course ON course.idCourse=course_student.courseId WHERE course.instructorId = ?`


function check(id) {
    return new Promise((resolve, reject) => {

        con.query(checkForInstructorStudents, [Number(id)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })

}

const checkStudents = async(req, res, next) => {
    const { id }: { id: string } = req.params;

    const students: Array = await check(id);
    console.log(students)
    let rez = new Object();
    for (var a in students) {
        if (rez[students[a].firstName]) {
            rez[students[a].firstName].push(students[a].name);
        } else {
            rez[students[a].firstName] = new Array(students[a].name);
        }
    }
    console.log('rez ', rez)
    res.status(200).send({ success: true, message: 'A list of the instructor students', body: rez });
    await next;
}



function insertIdCourse(idCourse, idStudent) {
    return new Promise((resolve, reject) => {
        con.query(selectCourse, [Number(idCourse), Number(idStudent)], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function insertID(req, res, next) {
    const {
        idCourse,
        idStudent
    }: {
        idCourse: ? number,
        idStudent: ? number
    } = req.body;
    const department = await insertIdCourse(idCourse, idStudent);
    res.status(201).send("MESSAGE");
    await next;
};





export default {
    insertID,
    checkStudents
}