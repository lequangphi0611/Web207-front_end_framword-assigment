app
    .component('updateProfile', {
        templateUrl: "/component/content/update-profile/updateTemplate.html",
        controller: updateProfileController
    });

function updateProfileController($rootScope, $location, SessionService, StudentService, $window) {

    this.account = angular.copy($rootScope.account);
    const session = SessionService.create("user");

    this.save = () => {
        StudentService.updateStudent(this.account);
        session.save(this.account);
        this.success = true;
    };

    this.$onDestroy = function() {
        $window.location.reload();
    };
};