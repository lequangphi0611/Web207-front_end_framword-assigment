app.config(function($routeProvider) {
    $routeProvider
        .when("/subject", {
            template: "<subjects-content></subjects-content>"
        })
        .when("/start/:id", {
            template: "<start-quiz></start-quiz>"
        })
        .when("/test/:id", {
            template: "<quizs-content></quizs-content>"
        })
        .when("/authenticate", {
            templateUrl: "/templates/authenticate.html"
        })
        .when("/end/:idSubject", {
            template: "<end-quiz></end-quiz>"
        })
        .otherwise({
            redirectTo: "/subject"
        })
});