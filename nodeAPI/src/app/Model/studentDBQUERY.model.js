/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */
const connection = require('../../DB/db.config').Dbconnection;
var Q = require('q');

let studentModel = {

    // Get All subjects

    getSubjects: (req, res) => {
        
        var deferred = Q.defer();

        let query = `SELECT * FROM subject_master WHERE is_deleted=0`;
        connection.query(query, (err, rows) => {

            if (!err) {               
                deferred.resolve(rows);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    },

    // Add Student Name

    addStudent: (req, res) => {
        
        var deferred = Q.defer();

        let query = `INSERT INTO student_master (student_name) VALUES ( '${req.body.student_name}');`;
        connection.query(query, (err, rows) => {

            if (!err) {               
                deferred.resolve(rows);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    },

    // Add Student Subject Marks
    addSubjectMarks: (req, res) => {
        
        var deferred = Q.defer();

        let query = `INSERT INTO marksheet_details (student_id, subject_id, marks_obtained) VALUES ?`;
        var studentMarks = [];

        for (let index = 0; index < req.body.subjects.length; index++) {
          const element = req.body.subjects[index];
          studentMarks[index] = [req.body.studentId, element.subject_id, element.marks_obtained];
        }
      
        connection.query(query, [studentMarks], (err, rows) => {

            if (!err) {               
                deferred.resolve(rows);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;
    },
    getMarksheetDetails:(req,res)=>{
        var deferred = Q.defer();

        let query = `SELECT subject.subject_name , student.student_name, marksheet.marks, marksheet.marks_obtained FROM marksheet_details AS marksheet 
        LEFT JOIN subject_master AS subject ON marksheet.subject_id = subject.subject_id
        LEFT JOIN student_master AS student ON marksheet.student_id = student.student_id WHERE student.student_id = ${req.params.student_id}`;

        connection.query(query, (err, result)=>{
            if (!err) {
                deferred.resolve(result);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;

    },
   deleteStudentDetails:(req, res)=> {
    var deferred = Q.defer();

        let query = `UPDATE student_master SET is_deleted = '1' WHERE student_master.student_id = ${req.params.student_id} `;
        connection.query(query, (err, result) => {
            if (!err) {
                deferred.resolve(result);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;

    },
    getStudentDetails:(req,res)=>{
        var deferred = Q.defer();

        let query = `SELECT * FROM student_master WHERE is_deleted = 0`;

        connection.query(query, (err, result)=>{
            if (!err) {
                deferred.resolve(result);
            } else {
                deferred.reject(new Error(err));
            }
        });
        return deferred.promise;

    },

    // getStudentDetails:(req,res)=>{
    //     var deferred = Q.defer();

    //     let query = `SELECT * FROM marksheet_details AS marksheet 
    //     LEFT JOIN subject_master AS subject ON marksheet.subject_id = subject.subject_id
    //     LEFT JOIN student_master AS student ON marksheet.student_id = student.student_id`;

    //     connection.query(query, (err, result)=>{
    //         if (!err) {
    //             deferred.resolve(result);
    //         } else {
    //             deferred.reject(new Error(err));
    //         }
    //     });
    //     return deferred.promise;

    // }
};

module.exports = studentModel;