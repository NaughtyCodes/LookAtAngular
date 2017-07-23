var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/PageTab");

    $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "/AngularJs/view/PageTab.html"
        })
        .state("PageTab.Page1", {
            url: "/Page1",
            templateUrl: "/AngularJs/view/Page1.html"
        })
        .state("PageTab.Page2", {
            url: "/Page2",
            templateUrl: "/AngularJs/view/Page2.html"
         })
        .state("PageTab.Page3", {
            url: "/Page3",
            templateUrl: "/AngularJs/view/Page3.html"
        }); 
});