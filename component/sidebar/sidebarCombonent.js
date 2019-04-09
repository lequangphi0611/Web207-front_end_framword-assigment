app.component('sideBar', {
    controller: function sideBarController(SubjectService, $location) {
        let ctrl = this;

        SubjectService.getSubjects().then(response => {
            ctrl.subjects = [...response.data];
        });
    },
    controllerAs: "ctrl",
    templateUrl: "/component/sidebar/sidebarTemplate.html"
});