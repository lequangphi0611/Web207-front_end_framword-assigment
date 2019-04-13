app.component('quizsContent', {
    controller: function quizsContentController($scope, $interval, $rootScope, SubjectService, QuizService, $routeParams, $document, $location) {

        let ctrl = this;
        var myLocalStorage = new MyLocalStorage("testInfo");

        ctrl.step = 1;
        ctrl.timer = {};
        let quizNumber = 10;

        (function init() {
            var isExistsStorage = myLocalStorage.isPresent();
            var testInfo;
            ctrl.index = 0;
            ctrl.myAnswers = [];
            ctrl.timer.value = 5 * 60;
            if (isExistsStorage) {
                testInfo = myLocalStorage.get();
                ctrl.questions = [...testInfo.questions];
                ctrl.index = testInfo.index;
                ctrl.myAnswers = [...testInfo.myAnswers];
                ctrl.timer.value = testInfo.time;
                myLocalStorage.clear();
            } else {
                loadQuestions();
            }
        })();

        ctrl.maxIndex = quizNumber - ctrl.step;
        for (let i = 0; i < $rootScope.account.subjects.length; i++) {
            let subject = $rootScope.account.subjects[i];
            if (subject.Id == $routeParams.id) {
                $location.path(`/end/${$routeParams.id}`);
                return;
            }
        }
        // lấy môn học từ url param
        ctrl.subject = SubjectService.findSubjectsBySubjectId($routeParams.id);

        var intervalCountdown;
        (function () {
            function countdown() {
                let minuteAndSecond = getMinutesAndSeconds(ctrl.timer.value);
                ctrl.timer.minutes = minuteAndSecond.minutes;
                ctrl.timer.seconds = minuteAndSecond.seconds;
                if (--ctrl.timer.value < 0) {
                    ctrl.timer.value = 0;
                    // ctrl.finish();
                    $location.path(`/end/${$routeParams.id}`);
                }
            }
            countdown();
            intervalCountdown = $interval(() => {
                countdown();
            }, 1000);
        })();

        function stopCountDown() {
            $interval.cancel(intervalCountdown);
        };

        // Lấy quizs theo môn học
        function loadQuestions() {
            QuizService.getQuizsBy($routeParams.id).then((response) => {
                ctrl.questions = new shuffleArray(response.data).limit(quizNumber).get();
                $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
            });
        }

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

        // finish test
        ctrl.finish = function () {
            ctrl.subject.testInfo = QuizService.getInfoTest(ctrl.myAnswers, ctrl.questions);
            ctrl.subject.testInfo.endTime = new Date();
            $rootScope.account.subjects.push(ctrl.subject);
        };

        ctrl.$onDestroy = function destroy() {
            var newPath = $location.path();
            var testInfo = {};
            testInfo.time = ctrl.timer.value;
            testInfo.questions = [...ctrl.questions];
            testInfo.myAnswers = [...ctrl.myAnswers];
            testInfo.index = ctrl.index;
            myLocalStorage.save(testInfo);
            if (ctrl.timer.value > 0 && !confirm("Bạn đang làm bài kiểm tra, nếu rời khỏi hệ thống sẽ tính điểm !\nBạn có muốn thoát hay không ? ")) {
                $location.path(`/test/${ctrl.subject.Id}`);
            } else {
                stopCountDown();
                myLocalStorage.clear();
                ctrl.finish();
                $location.path(newPath);
            }
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

function MyLocalStorage(key) {
    this.save = function (data) {
        localStorage.setItem(key, JSON.stringify(data));
        return this;
    };

    this.clear = function () {
        localStorage.setItem(key, undefined);
        return this;
    };

    this.isPresent = function () {
        var ob = localStorage.getItem(key);
        return ob != '' && ob != "null" && ob != "undefined" & ob != null;
    };

    this.get = function () {
        return JSON.parse(localStorage.getItem(key));
    }
}