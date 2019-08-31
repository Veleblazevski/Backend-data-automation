import database from '../db/database';

import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { con } = database;
const createSingleInstructor = `INSERT INTO instructors (headedBy,firstName,lastName,email,departmentName,password,salt) VALUES (?,?,?,?,?,?,?)`;
const getSingleInstructor = `SELECT * FROM instructors WHERE idInst = ?`;
const listAllIns = `SELECT * FROM instructors`;
const deleteInstructor = `DELETE FROM instructors WHERE idInst = ?`;
const updateInstructor = `UPDATE instructors SET headedBy = ?,firstName = ?,lastName = ?,email = ? WHERE idInst = ?`;
const innerJoin = `SELECT headedBy FROM instructors  INNER JOIN department  ON instructors.departmentName=department.nameDepartment WHERE department.nameDepartment = ?`;
const getInstructorCourses = `SELECT name FROM course INNER JOIN instructors ON course.instructorId = instructors.idInst WHERE course.instructorId = ?`;


function getSingleInstCourses(id) {
    return new Promise((resolve, reject) => {

        con.query(getInstructorCourses, [Number(id)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })

}

const courseByInstr = async(req, res, next) => {
    const { id }: { id: string } = req.params;

    const instructor: Object = await getSingleInstCourses(id);
    res.status(200).send({ success: true, message: 'A list of the instructor courses', body: instructor });
    await next;
}



function updateOneInstructor(id, headedBy, FirstName, LastName, Email, password) {
    return new Promise((resolve, reject) => {
        con.query(updateInstructor, [headedBy, FirstName, LastName, Email, Number(id), password], (err, results) => {
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
        headedBy,
        FirstName,
        LastName,
        Email,
        password

    }: {
        headedBy: ? string,
        FirstName: ? string,
        LastName: ? string,
        Email: ? string,
        password: ? string

    } = req.body;

    const updateSingleProp = await getSingleInst(id);
    let x = {
        id: updateSingleProp[0].id,
        headedBy: updateSingleProp[0].headedBy,
        FirstName: updateSingleProp[0].FirstName,
        LastName: updateSingleProp[0].LastName,
        Email: updateSingleProp[0].Email

    };
    if (id, headedBy, FirstName, LastName, Email) {
        await updateOneInstructor(id, headedBy, FirstName, LastName, Email);
    } else if (headedBy && !FirstName && !LastName && !Email) {
        await updateOneInstructor(id, headedBy, x.FirstName, x.LastName, x.Email);
    } else if (!headedBy && FirstName && !LastName && !Email) {
        await updateOneInstructor(id, x.headedBy, FirstName, x.LastName, x.Email);
    } else if (!headedBy && !FirstName && LastName && !Email) {
        await updateOneInstructor(id, x.headedBy, x.FirstName, LastName, x.Email);
    } else if (!headedBy && !FirstName && !LastName && Email) {
        await updateOneInstructor(id, x.headedBy, x.FirstName, x.LastName, Email);
    }
    res.status(204).send("MESSAGE");
    await next;
};







function deleteOneInstructor(id) {
    return new Promise((resolve, reject) => {
        con.query(deleteInstructor, Number(id), (err, results) => {
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
    const post: Object = await deleteOneInstructor(id);
    res.status(202).send(`You deleted instructor with id${id}`);
    await next;
}




const listBydepartment = async(req, res, next) => {
    console.log("Vele" + req.params.departmentName)

    return con.query(innerJoin, [req.params.departmentName], (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(results)
            res.status(200).send(results);
        }
    })
    return await next;
}




function listAll() {
    return new Promise((resolve, reject) => {
        con.query(listAllIns, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function list(req, res, next) {

    const instructorList: Array = await listAll();
    res.status(200).send({ success: true, message: 'A list of all instructors', body: instructorList });
    await next;
};








function getSingleInst(id) {
    return new Promise((resolve, reject) => {

        con.query(getSingleInstructor, [Number(id)], (err, results) => {
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
    console.log("vele tele")
    const instructor: Object = await getSingleInst(id);
    res.status(200).send({ success: true, message: 'A single instructor', body: instructor });
    await next;
}









function createInstructor(headedBy, FirstName, LastName, Email, departmentName, password, salt) {
    return new Promise((resolve, reject) => {
        con.query(createSingleInstructor, [headedBy, FirstName, LastName, Email, departmentName, password, salt], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};
async function create(req, res, next) {
    const {

        headedBy,
        FirstName,
        LastName,
        Email,
        departmentName,
        password
    }: {

        headedBy: ? string,
        FirstName: ? string,
        LastName: ? string,
        Email: ? string,
        departmentName: ? string,
        password: ? string

    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const getRounds = bcrypt.getRounds(salt);
    const passHash = bcrypt.hashSync(password, getRounds);


    const department = await createInstructor(headedBy, FirstName, LastName, Email, departmentName, passHash, salt);
    res.status(201).send(`Instructor created with the name ${FirstName}`);
    await next;
};
export default {
    create,
    get,
    listBydepartment,
    del,
    update,
    list,
    courseByInstr
}




















// function listingAllPosts(userId) {
//     return new Promise((resolve, reject) => {
//         con.query(getPostsList, [Number(userId)], (err, results) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(results);
//         });
//     });
// };
// async function list(req, res, next) {
//     const { userId }: { userId: string } = req.params;
//     const posts: Array = await listingAllPosts(userId);
//     res.status(200).send({ success: true, message: 'A list of all posts', body: posts });
//     await next;
// };


// function createPost(text, likes, userId, comments) {
//     return new Promise((resolve, reject) => {
//         con.query(insertPost, [text, likes, userId, comments], (err, results) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(results);
//         });
//     });
// };
// async function create(req, res, next) {
//     const { userId }: { userId: string } = req.params;
//     const {
//         text,
//         likes,
//         comments
//     }: {
//         text: ? string,
//         likes: ? number,
//         comments: ? number
//     } = req.body;
//     const posts = await createPost(userId, text, likes, comments);
//     res.status(201).send("MESSAGE");
//     await next;
// };

// function getSinglePost(postId, id) {
//     return new Promise((resolve, reject) => {
//         con.query(getSinglePostById, [Number(postId), Number(id)], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         })
//     })

// }

// const get = async(req, res, next) => {
//     const { userId, id }: { userId: string, id: string } = req.params;
//     const post: Object = await getSinglePost(userId, id);
//     res.status(200).send({ success: true, message: 'A single post', body: post });
//     await next;
// }

// function updatePost(id, text, likes, comments) {
//     return new Promise((resolve, reject) => {
//         con.query(updatepost, [text, likes, comments, Number(id)], (err, results) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(results);
//         });
//     });
// };
// async function update(req, res, next) {
//     const { id }: { id: string } = req.params;

//     const {
//         text,
//         likes,
//         comments
//     }: {
//         text: ? string,
//         likes: ? number,
//         comments: ? number
//     } = req.body;

//     const updateSingleProp = await getSinglePost(id);
//     let x = {
//         id: updateSingleProp[0].id,
//         userId: updateSingleProp[0].userId,
//         text: updateSingleProp[0].text,
//         likes: updateSingleProp[0].likes,
//         comments: updateSingleProp[0].comments
//     };
//     if (text, likes, comments) {
//         await updatePost(id, text, likes, comments);
//     } else if (text && !likes && !comments) {
//         await updatePost(id, text, x.likes, x.comments);
//     } else if (!text && likes && !comments) {
//         await updatePost(id, x.text, likes, x.comments);
//     } else if (!text && !likes && comments) {
//         await updatePost(id, x.text, x.likes, comments);
//     }
//     res.status(204).send("MESSAGE");
//     await next;
// };

// function deleteOnePost(id) {
//     return new Promise((resolve, reject) => {
//         con.query(deletePost, Number(id), (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         })
//     })

// }
// const del = async(req, res, next) => {
//     const { id }: { id: string } = req.params;
//     const post: Object = await deleteOnePost(id);
//     res.status(202).send("you deleted user");
//     await next;
// }



// export default {
//     list,
//     create,
//     get,
//     update,
//     del
// }