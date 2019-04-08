var app = angular.module("mApp", ["ngRoute"])

.service('SubjectService', ['$http', function SubjectService($http) {
    const http = "/db/Subjects.js";

    this.subjects = [];

    this.getSubjects = () => {
        return $http.get(http);
    };

    $http.get(http).then(response => {
        this.subjects = response.data;
    });

    this.findSubjectsBySubjectId = (subjectId) => {
        let subjectResult = {};
        for (let i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i].Id == subjectId) {
                subjectResult = this.subjects[i];
                break;
            }
        };
        return subjectResult;

    };

}])

.service('QuizService', ['$http', function QuizService($http) {
    this.getQuizsBy = (subjectId) => {
        const http = `/db/Quizs/${subjectId}.js`;
        return $http.get(http);
    };
}])

.service('StudentService', ['$http', function StudentService($http) {
    const http = "/db/Students.js";

    this.getStudents = () => {
        return $http.get(http);
    };
}])