angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
    })
    .state('app.translate', {
      url: "/translate",
      views: {
        'menuContent' :{
          templateUrl: "templates/translate.html",
          controller: "TranslateCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/app/translate");
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('TranslateCtrl', function($scope, $http, $ionicLoading) {
  
  $scope.source = 'Hola hola, no vengas sola!';
  
  $scope.translate = function() {

      $ionicLoading.show({
        template: 'Translating . . .'
      });

      $http.get('https://statickidz.com/scripts/traductor/', {
          params: {
              source: 'es',
              target: 'en',
              q: $scope.source
          }
       })
       .success(function (data,status) {
            $ionicLoading.hide();
            $scope.target = data.translation;
       });
    
  	}
  
});