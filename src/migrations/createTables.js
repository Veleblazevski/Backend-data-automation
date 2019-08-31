const department = `
CREATE TABLE IF NOT EXISTS department (
  nameDepartment VARCHAR(255) NOT NULL,
  PRIMARY KEY (nameDepartment),
  location VARCHAR(255) NOT NULL
)
`;


const createInstructors = `
CREATE TABLE IF NOT EXISTS instructors (
  idInst INT(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (idInst),
  headedBy VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  departmentName VARCHAR(255),
  FOREIGN KEY (departmentName) REFERENCES department (nameDepartment),
  password VARCHAR(255),
  salt VARCHAR(255)
 
) 
`;


const createStudents = `
CREATE TABLE IF NOT EXISTS students (
  idStudent INT(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (idStudent),
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
)
`;

const createCourse = `
CREATE TABLE IF NOT EXISTS course (
  idCourse INT(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (idCourse),
  duration integer(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
  instructorId INT(10),
  FOREIGN KEY (instructorId) REFERENCES instructors (idInst),
  departmentName VARCHAR(255),
  FOREIGN KEY (departmentName) REFERENCES department (nameDepartment)
) 
`;

const courseStudent = `
CREATE TABLE IF NOT EXISTS course_student (
  courseId INT(10),
  studentId INT(10),
  FOREIGN KEY (courseId) REFERENCES course (idCourse),
  FOREIGN KEY (studentId) REFERENCES students (idStudent)
)
`;


export default {
    createInstructors,
    createStudents,
    department,
    createCourse,
    courseStudent
}