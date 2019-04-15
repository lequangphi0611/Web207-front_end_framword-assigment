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

        this.getInfoTest = function (myAnswers, allQuestions) {
            var testInfo = {};
            testInfo.detail = [];
            testInfo.totalScores = 0;

            for (let i = 0; i < allQuestions.length; i++) {
                let isCorrect = myAnswers[i] && myAnswers[i] == allQuestions[i].AnswerId;
                let scores = isCorrect ? allQuestions[i].Marks : 0;
                testInfo.totalScores += scores;
                testInfo.detail.push({
                    questionText: allQuestions[i].Text,
                    correct: isCorrect,
                    scores: scores
                });
            }

            function count(condition) {
                var count = 0;
                testInfo.detail.forEach(function (detail) {
                    if (condition(detail)) {
                        count++;
                    }
                });
                return count;
            }

            testInfo.countCorrectAnswer = function () {
                return count(function (detail) {
                    return detail.correct;
                });
            };

            testInfo.countInCorrectAnswer = function () {
                return count(function (detail) {
                    return !detail.correct;
                });
            };

            return testInfo;
        };
    }])

    .service('StudentService', ['$http', function StudentService($http) {
        const http = "/db/Students.js";
        const myStorage = new MyLocalStorage("students");

        this.getAllStudent = () => {
            return myStorage.get();
        };

        if (this.getAllStudent() == null) {
            $http.get(http).then(response => {
                myStorage.save(response.data);
            });
        }

        this.saveAll = (students) => {
            myStorage.save(students);
        };

        this.existByUsername = (username) => {
            return this.findStudentsById(username) != null;
        };

        this.appendStudent = (student) => {
            if (!this.existByUsername(student.username)) {
                var students = myStorage.get();
                var index = students.push(student) - 1;
                this.saveAll(students);
                return index;
            }
            return -1;
        };

        this.findStudentsById = (username) => {
            var students = this.getAllStudent();
            var student = null;
            for (let i = 0; i < students.length; i++) {
                if (username === students[i].username) {
                    student = students[i];
                }
            };
            return student;
        };

        this.indexOf = (student) => {
            var students = this.getAllStudent();
            for (let i = 0; i < students.length; i++) {
                if (student.username == students[i].username) {
                    return i;
                }
            }
            return -1;
        };

        this.updateStudent = (newStudent) => {
            var students = this.getAllStudent();
            var oldStudent = this.findStudentsById(newStudent.username);
            if (oldStudent == null) {
                return null;
            }
            var index = this.indexOf(oldStudent);
            students[index] = newStudent;
            return newStudent;
        };

    }])