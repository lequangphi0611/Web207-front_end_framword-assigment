app
    .component('updateProfile', {
        templateUrl : "/component/content/update-profile/updateTemplate.html",
        controller : updateProfileController
    });

    function updateProfileController($rootScope, $location, StudentService) {

        this.account = angular.copy($rootScope.account);

        this.account.fullname = "lê Quang PHi";
        
        this.save = () => {
            StudentService.updateStudent(this.account);

        };
    };