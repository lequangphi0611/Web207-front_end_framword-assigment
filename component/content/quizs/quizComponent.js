app.component('quizsContent', {
    controller: function quizsContentController($http, $rootScope) {

        let ctrl = this;

        $rootScope.getQuestionBySubjectId("ADBS").then(() => {
            ctrl.questions = $rootScope.questions;
        });


        ctrl.index = 0;

    },
    controllerAs: "ctrl",
    templateUrl: "/component/content/quizs/quizTemplate.html"
});