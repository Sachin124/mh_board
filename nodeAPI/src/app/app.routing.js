const URL = `/api/`;

const STUDENTAPI = require('./Controller/studentAPI.controller');
exports.routesConfig = function (app) {
    app.get(`${URL}get-students`, [
        STUDENTAPI.getStudentsDetails
    ]);
    
    app.get(`${URL}get-subjects`, [
        STUDENTAPI.getSubjects
    ]);

    app.post(`${URL}add-student`, [
        STUDENTAPI.addStudentInfo
    ]);

    app.delete(`${URL}delete-student/:student_id`, [
        STUDENTAPI.deleteStudentInfo
    ]);

    app.get(`${URL}view-student/:student_id`, [
        STUDENTAPI.getStudentsMarks
    ]);

};