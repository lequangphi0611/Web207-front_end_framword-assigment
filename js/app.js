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

        this.getStudents = () => {
            return $http.get(http);
        };

    }])