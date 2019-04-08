app.controller("mainCtrl", ($rootScope, $scope, $http, SubjectService, StudentService, $window) => {

    $rootScope.title = "Trang chủ";

    $rootScope.setTitle = (name) => {
        $rootScope.title = name;
    };

    var storageUser = new Storage("user", null);

    if (storageUser.isPresent()) {
        $rootScope.account = storageUser.get();
        $rootScope.account.getFirstName = () => {
            let fullname = $rootScope.account.fullname.trim();
            let firstName = fullname.substring(fullname.lastIndexOf(" "));
            return firstName;
        }
    };

    $rootScope.isLogin = () => {
        return storageUser.isPresent();
    };

    $scope.logOut = () => {
        storageUser.remove();
        $window.location.reload();
    }




});