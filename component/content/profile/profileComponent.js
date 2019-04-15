app 
    .component('profileContent', {
        templateUrl : "/component/content/profile/profileTemplate.html",
        controller : profileController
    });

    function profileController($rootScope) {
        this.student = $rootScope.account;
        $rootScope.setTitle(this.student.fullname);
    };