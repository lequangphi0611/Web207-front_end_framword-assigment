var app = angular.module("mApp", []);

app.controller("mainCtrl", async($rootScope, $scope, $http) => {

    $rootScope.title = "Trang chủ";

    $rootScope.getQuestionBySubjectId = async(id) => {

        await $http.get(`/db/Quizs/${id}.js`).then(response => {
            $rootScope.questions = response.data;
        });

    };


});