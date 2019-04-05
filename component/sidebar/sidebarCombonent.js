app.component('sideBar', {
    controller: function sideBarController($http) {

        let ctrl = this;
        $http.get("/db/Subjects.js").then(response => {
            ctrl.subjects = response.data;
        });

    },
    controllerAs: "ctrl",
    templateUrl: "/component/sidebar/sidebarTemplate.html"
});