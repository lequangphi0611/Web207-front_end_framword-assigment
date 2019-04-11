app.component('quizsContent', {
    controller: function quizsContentController($http, $interval, $rootScope, SubjectService, QuizService, $routeParams, $document, $location) {

        if (!$rootScope.isLogin()) {
            $location.path("/authenticate");
            return;
        }

        let ctrl = this;

        ctrl.step = 1;
        ctrl.index = 0;
        let quizNumber = 10;

        ctrl.maxIndex = quizNumber - ctrl.step;

        // lấy môn học từ url param
        ctrl.subject = SubjectService.findSubjectsBySubjectId($routeParams.id);

        // count down
        ctrl.timer = {};
        ctrl.timer.value = 8 * 60;
        ctrl.startCountdown = () => {
            function countdown() {
                let minuteAndSecond = getMinutesAndSeconds(ctrl.timer.value);
                ctrl.timer.minutes = minuteAndSecond.minutes;
                ctrl.timer.seconds = minuteAndSecond.seconds;
                if (--ctrl.timer.value < 0) {
                    ctrl.timer.value == 0;
                }
            }
            countdown();
            $interval(() => { countdown() }, 1000);
        }
        ctrl.startCountdown();

        // Lấy quizs theo môn học
        QuizService.getQuizsBy($routeParams.id).then((response) => {
            ctrl.questions = new shuffleArray(response.data).limit(quizNumber).get();
            $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
        });

        // Phân trang
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

        // Quiz procress
        ctrl.myAnswers = [];

        // finish test
        ctrl.finish = function(idSubject) {
            ctrl.subject.testInfo = QuizService.getInfoTest(ctrl.myAnswers, ctrl.questions);
            $rootScope.account.subjects.push(ctrl.subject);
            $location.path(`/end/${idSubject}`);
        };

    },
    controllerAs: "ctrl",
    templateUrl: "/component/content/quizs/quizTemplate.html"
});

function formatTime(param) {
    return param < 10 ? "0" + param : param;
}

function getMinutesAndSeconds(duration) {
    let minutes = parseInt(duration / 60, 10);
    let seconds = parseInt(duration % 60, 10);

    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    return {
        minutes: minutes,
        seconds: seconds
    };
}