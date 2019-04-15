app.controller("mainCtrl", ($rootScope, $scope, $http, SubjectService, StudentService, $window) => {

    $rootScope.title = "Online Training";
    $rootScope.key = {};

    var storageUser = new Storage("user", null);

    $rootScope.setTitle = (name) => {
        $rootScope.title = name;
    };


    if (storageUser.isPresent()) {
        $rootScope.account = storageUser.get();
        $rootScope.account.getFirstName = () => {
            let fullname = $rootScope.account.fullname.trim();
            let firstName = fullname.substring(fullname.lastIndexOf(" "));
            return firstName;
        };
        $rootScope.account.subjects = [];
        $rootScope.account.hasTested = (subjectId) => {
            let subjects = [...$rootScope.account.subjects];
            for (let i = 0; i < subjects.length; i++) {
                if (subjectId == subjects[i].Id) {
                    return true;
                }
            }
            return false;
        };
        $rootScope.account.getTotalScores = function() {
            var sumScores = 0;
            if($rootScope.account.subjects.length > 0) {
                $rootScope.account.subjects.forEach(subject => {
                    sumScores += subject.testInfo.totalScores;
                });
                $rootScope.account.marks = sumScores / $rootScope.account.subjects.length;
            }
            return $rootScope.account.marks;
        }
    };

    $rootScope.isLogin = () => {
        return storageUser.isPresent();
    };

    $scope.logOut = () => {
        storageUser.remove();
        $window.location.reload();
    };

});