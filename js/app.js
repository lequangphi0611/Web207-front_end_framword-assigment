var app = angular.module("mApp", []);

// SUBJECT SERVICE
app.factory('SubjectService', ['$http', async function SubjectService($http) {

    var getAll = async function() {
        let subjects;

        await $http.get("/db/Subjects.js").then(response => {
            subjects = response.data;
        });

        return subjects;
    }

    return {
        getAll: getAll()
    }
}]);

app.controller("mainCtrl", async($rootScope, $scope, SubjectService, $http) => {


});