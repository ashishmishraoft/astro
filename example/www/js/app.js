// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){

  var unique_array = [];

  app = angular.module('starter', ['ionic', 'WifiServices']);

  app.controller('WifiController', ['$scope', 'WifiService', '$ionicModal',function($scope, WifiService,$ionicModal){

    $scope.wifiList = [];
    $scope.addwifi = {};
    $scope.scanwifi = {};

    window.setTimeout(function(){
      $scope.wifiList = WifiService.list();
      // alert($scope.wifiList);
      $scope.$apply();
    }, 5000);

    $scope.getList = function(){
      $scope.wifiList = WifiService.list();
    }

    $scope.addWlan = function(name){
      $scope.addwifi.name = name;
      $scope.modal.show();
    }

    $scope.submitaddWlan = function(data){
      $scope.wifiLists = WifiService.addToWifi(data.name,data.password);
      $scope.modal.hide();
      window.setTimeout(function(){
        $scope.wifiList = WifiService.list();
        // alert($scope.wifiList);
        $scope.$apply();
      }, 5000);
    }

    $scope.connectWifi = function(name){
      WifiService.connectionToWifi(name);
    }

    $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  }]);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

}());