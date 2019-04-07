app.controller("mainCtrl", ($rootScope, $scope, $http, SubjectService) => {

    $rootScope.title = "Trang chủ";

    $rootScope.setTitle = (name) => {
        $rootScope.title = name;
    };

    $scope.account = null;

    $scope.hasLogin = () => {
        return $scope.account != null;
    }

});