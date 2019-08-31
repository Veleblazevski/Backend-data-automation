import database from '../db/database';
import Bluebird from 'bluebird';


const { con } = database;
const createSingleDepartment = `INSERT INTO department (nameDepartment,location) VALUES (?,?)`;
const getSingleDepartment = `SELECT * FROM department WHERE idDepartment = ?`;
const listAllDepartments = `SELECT * FROM department`;
const deleteDepartment = `DELETE FROM department WHERE idDepartment = ?`;
const updateDepartment = 'UPDATE department SET name = ?,location = ? WHERE idDepartment = ?';

function updateOneDepartment(name, location) {
    return new Promise((resolve, reject) => {
        con.query(updateDepartment, [name, location], (err, results) => {
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
        name,
        location,

    }: {
        name: ? string,
        location: ? string

    } = req.body;

    const updateSingleDep = await getSingleDep(id);
    let x = {
        id: updateSingleDep[0].id,
        name: updateSingleDep[0].name,
        location: updateSingleDep[0].location,

    };
    if (id, name, location) {
        await updateOneDepartment(id, name, location);
    } else if (name && !location) {
        await updateOneDepartment(id, name, x.location);
    } else if (!name && location) {
        await updateOneDepartment(id, x.name, location);
    }
    res.status(204).send("MESSAGE");
    await next;
};







function deleteOneDepartment(id) {
    return new Promise((resolve, reject) => {
        con.query(deleteDepartment, Number(id), (err, results) => {
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
    const post: Object = await deleteOneDepartment(id);
    res.status(202).send(`You deleted department with id${id}`);
    await next;
}








function listingAllDepartments() {
    return new Promise((resolve, reject) => {
        con.query(listAllDepartments, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function list(req, res, next) {

    const departmentslist: Array = await listingAllDepartments();
    res.status(200).send({ success: true, message: 'A list of all departments', body: departmentslist });
    await next;
};








function getSingleDep(id) {
    return new Promise((resolve, reject) => {
        con.query(getSingleDepartment, [Number(id)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })

}

const get = async(req, res, next) => {
    const { id }: { id: string } = req.params;
    const department: Object = await getSingleDep(id);
    res.status(200).send({ success: true, message: 'A single department', body: department });
    await next;
}









function createDepartment(name, location) {
    return new Promise((resolve, reject) => {
        con.query(createSingleDepartment, [name, location], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function create(req, res, next) {
    const {
        name,
        location
    }: {
        name: ? string,
        location: ? string,
    } = req.body;
    const department = await createDepartment(name, location);
    res.status(201).send("MESSAGE");
    await next;
};
export default {
    create,
    get,
    list,
    del,
    update
}