app.component('sideBar', {
    controller: function sideBarController(SubjectService, $location, $rootScope) {
        let ctrl = this;

        SubjectService.getSubjects().then(response => {
            ctrl.subjects = [...response.data];
        });
        ctrl.key = $rootScope.key;
        ctrl.hasTested = $rootScope.account.hasTested;
    },
    controllerAs: "ctrl",
    templateUrl: "/component/sidebar/sidebarTemplate.html"
});