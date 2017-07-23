var myApp = angular.module('myApp', []);

myApp.value('clientId', 'a12345654321x');

myApp.controller('DemoController', ['clientId', function DemoController(clientId) {
	  this.clientId = clientId;
	}]);

myApp.factory('clientId', function clientIdFactory() {
	  return 'a12345654321x';
	});

myApp.factory('apiToken', ['clientId', function apiTokenFactory(clientId) {
	  var encrypt = function(data1, data2) {
	    // NSA-proof encryption algorithm:
	    return (data1 + ':' + data2).toUpperCase();
	  };

	  var secret = window.localStorage.getItem('myApp.secret');
	  var apiToken = encrypt(clientId, secret);

	  return apiToken;
	}]);

function UnicornLauncher(apiToken) {

	  this.launchedCount = 0;
	  this.launch = function() {
	    // Make a request to the remote API and include the apiToken
	    
	    this.launchedCount++;
	  }
	}

myApp.factory('unicornLauncher', ["apiToken", function(apiToken) {
	  return new UnicornLauncher(apiToken);
	}]);

myApp.service('unicornLauncher', ["apiToken", UnicornLauncher]);

myApp.provider('unicornLauncher', function UnicornLauncherProvider() {
	  var useTinfoilShielding = false;

	  this.useTinfoilShielding = function(value) {
	    useTinfoilShielding = !!value;
	  };

	  this.$get = ["apiToken", function unicornLauncherFactory(apiToken) {

	    // let's assume that the UnicornLauncher constructor was also changed to
	    // accept and use the useTinfoilShielding argument
	    return new UnicornLauncher(apiToken, useTinfoilShielding);
	  }];
	});

myApp.config(["unicornLauncherProvider", function(unicornLauncherProvider) {
	  unicornLauncherProvider.useTinfoilShielding(true);
	}]);