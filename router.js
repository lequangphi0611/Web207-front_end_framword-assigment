app.config(function($routeProvider) {
    $routeProvider
        .when("/subject", {
            template: "<subjects-content></subjects-content>"
        })
        .when("/Test/:id", {
            template: "<quizs-content></quizs-content>"
        })
        .otherwise({
            redirectTo: "/subject"
        })
});