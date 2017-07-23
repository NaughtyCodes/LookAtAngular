var app = angular.module("myApp", ['ui.router']);

app.provider('helloWorld', function() {

    this.name = 'Default';

    this.$get = function($http) {
    	
        return {
            sayHello: function() {
            	return $http.get('http://services.groupkt.com/country/get/all');
            }
        }
    };

    this.setName = function(name) {	
    	this.name = name;
    };
    
});


app.config(function($stateProvider,$urlRouterProvider,$provide,helloWorldProvider) {
	
	alert("app config");
	
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

app.run(function($rootScope,helloWorld) {
    alert("app run");
    $rootScope.data = "s";
    helloWorld.sayHello().then(function(promise){
		   alert(JSON.stringify(promise.data));
		   $rootScope.data = JSON.stringify(promise.data);
	});
});

app.directive("test1", function() {
    alert("app directive setup");
    return {
        compile: function() {alert("app directive compile");}
    }
});

app.directive("test2", function() {
    return {
        link: function() {alert("app directive link");}
    }
});

app.factory('userRepository', function($http) {
	  this.sayHello = function() {
      	return $http.get('http://services.groupkt.com/country/get/all');
      }		
});

app.controller('myAppController', ['$rootScope','$scope', '$http','helloWorld', function($rootScope,$scope, $http, helloWorld){
	
	if($rootScope.data.length > 0)
		alert("app controller");
	
	helloWorld.sayHello().then(function(promise){
		   alert(JSON.stringify(promise.data));
	});
   
	alert($rootScope.data);
	
}]);

	