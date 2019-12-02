/*
 *   Copyright (c) 2019 Created By: Sachin S. Bahegavankar
 *   All rights reserved.
 */

var q = require('q');
const CMODEL = require('../Model/studentDBQUERY.model');
var _ = require('lodash');
let studentController = {

    getSubjects: (req, res) => {

        CMODEL.getSubjects(req).then(rows => {
            response = {
                "status": 1,
                "data": rows
            };
            res.json(response);
        }).catch(error => {
            response = { "status": 0, "message": error.message };
            res.json(response);
        });
    },

    addStudentInfo: (req, res) => {
        CMODEL.addStudent(req).then(rows => {
            req.body.studentId = rows.insertId;
            CMODEL.addSubjectMarks(req).then(result => {
                response = {
                    "status": 1,
                    "message": 'Student Added Successfully!'
                };
                res.json(response);
            });

        }).catch(error => {
            response = { "status": 0, "message": error.message };
            res.json(response);
        });
    },

    deleteStudentInfo: (req, res) => {
        CMODEL.deleteStudentDetails(req).then(rows => {
            response = {
                "status": 1,
                "message": 'Student Deleted Successfully!'
            };
            res.json(response);

        }).catch(error => {
            response = { "status": 0, "message": error.message };
            res.json(response);
        });
    },

    getStudentsDetails: (req, res) => {
            CMODEL.getStudentDetails(req).then(response=>{
                response = {
                    "status": 1, 
                    "data": response
                };
                res.json(response);
           
        }).catch(error => {
            response = { "status": 0, "message": error.message };
            res.json(response);
        })
    },

    getStudentsMarks: (req, res) => {
        CMODEL.getMarksheetDetails(req).then(response=>{
            var totalMarks = ['marks_obtained'];
            var totalCount = _.sumBy(totalMarks, _.partial(_.sumBy, response));
            response = {
                "status": 1, 
                "data": response,
                totalCount: totalCount,
                student_name: response[0].student_name
            };
            res.json(response);
       
    }).catch(error => {
        response = { "status": 0, "message": error.message };
        res.json(response);
    })
}
};

module.exports = studentController;