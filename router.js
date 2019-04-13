app
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
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
                redirectTo: "/"
            });
    })

    .run(($rootScope, $location) => {
        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            var urls = ["/", "/authenticate", ""];
            if (urls.indexOf($location.path()) < 0 && !$rootScope.isLogin()) {
                $location.path("/authenticate");
            }
        });
    })