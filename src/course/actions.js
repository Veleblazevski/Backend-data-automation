import database from '../db/database';
import Bluebird from 'bluebird';
import { resolve } from 'url';


const { con } = database;
const createSingleCourse = `INSERT INTO course (duration,name,instructorId,departmentName) VALUES (?,?,?,?)`;
const getCourseByID = `SELECT * FROM course WHERE idCourse = ?`;
const listAllcourses = `SELECT * FROM course`;
const deleteCourse = `DELETE FROM course WHERE idCourse = ?`;

const updateCourse = 'UPDATE course SET name = ? WHERE idCourse = ?';

function updateOneCourse(id, name) {
    return new Promise((resolve, reject) => {
        con.query(updateCourse, [name, Number(id)], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function update(req, res, next) {
    const { id }: { id: string } = req.params;

    const {
        name


    }: {
        name: ? string
    } = req.body;

    const updateSingleDep = await getSingleCourse(id);
    let x = {
        id: updateSingleDep[0].id,
        name: updateSingleDep[0].name,


    };
    if (id, name) {
        await updateOneCourse(id, name);
    } else if (name) {
        await updateOneCourse(id, name);
    } else if (!name) {
        await updateOneCourse(id, x.name);
    }
    res.status(204).send("MESSAGE");
    await next;
};














function listAll() {
    return new Promise((resolve, reject) => {
        con.query(listAllcourses, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function list(req, res, next) {

    const courses: Array = await listAll();
    res.status(200).send({ success: true, message: 'A list of all courses', body: courses });
    await next;
};





function deleteOneCourse(id) {
    return new Promise((resolve, reject) => {
        con.query(deleteCourse, Number(id), (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })

}
const del = async(req, res, next) => {
    const { id }: { id: string } = req.params;
    const course: Object = await deleteOneCourse(id);
    res.status(202).send(`You deleted course with id${id}`);
    await next;
}




function getSingleCourse(id) {
    return new Promise((resolve, reject) => {

        con.query(getCourseByID, [Number(id)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })

}

const getOneCourseByID = async(req, res, next) => {
    const { id }: { id: string } = req.params;

    const course: Object = await getSingleCourse(id);
    res.status(200).send({ success: true, message: 'A single course', body: course });
    await next;
}


function createCourse(duration, name, instructorId, departmentName) {
    return new Promise((resolve, reject) => {
        con.query(createSingleCourse, [Number(duration), name, Number(instructorId), departmentName], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function create(req, res, next) {
    const {
        duration,
        name,
        instructorId,
        departmentName

    }: {
        duration: ? number,
        name: ? string,
        instructorId: ? number,
        departmentName: ? string
    } = req.body;
    const department = await createCourse(duration, name, instructorId, departmentName);
    res.status(201).send(`Course created with the name ${name}`);
    await next;
};
export default {
    create,
    getOneCourseByID,
    del,
    list,
    update


}