app.component('quizsContent', {
    controller: function quizsContentController($http, $rootScope, SubjectService, QuizService, $routeParams, $document) {

        let ctrl = this;

        ctrl.step = 1;
        ctrl.index = 0;
        let quizNumber = 10;

        ctrl.maxIndex = quizNumber - ctrl.step;

        ctrl.subject = SubjectService.findSubjectsBySubjectId($routeParams.id);
        // activeSidebar(`sidebar${ctrl.subject.Id}`);

        QuizService.getQuizsBy($routeParams.id).then((response) => {
            ctrl.questions = new shuffleArray(response.data).limit(quizNumber).get();
            $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
        });

        ctrl.hasNext = () => {
            return ctrl.index < ctrl.maxIndex;
        };

        ctrl.hasPrev = () => {
            return ctrl.index > 0;
        };

        ctrl.first = () => {
            ctrl.index = 0;
            $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
        };

        ctrl.last = () => {
            ctrl.index = ctrl.maxIndex;
            $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
        };

        ctrl.prev = () => {
            if (ctrl.hasPrev()) {
                ctrl.index -= ctrl.step;
                $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
            }
        };

        ctrl.next = () => {
            if (ctrl.hasNext()) {
                ctrl.index += ctrl.step;
                $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
            }
        };

    },
    controllerAs: "ctrl",
    templateUrl: "/component/content/quizs/quizTemplate.html"
});