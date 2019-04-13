app.component('endQuiz', {
    templateUrl: "/component/content/quizs/end-quiz/endQuizTemplate.html",
    controller: function EndQuizController($routeParams, $rootScope, $location) {

        for (let i = 0; i < $rootScope.account.subjects.length; i++) {
            if ($routeParams.idSubject == $rootScope.account.subjects[i].Id) {
                this.subject = $rootScope.account.subjects[i];
                $rootScope.setTitle(this.subject.Name);
                break;
            }
        }

    }
})