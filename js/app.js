var et = angular.module("et", ["LocalStorageModule", "xeditable", "ngAnimate", "truncate", "ui.router"]);


et.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "localStorageServiceProvider", 
  function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('expenseTracker');
  $locationProvider.html5Mode(false)
  .hashPrefix('!');
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "views/home.html",
    controller: "ExpensesCtrl"
  });
  
}]);


et.run(function(editableOptions) {
  editableOptions.theme = 'default';
});


et.controller("ExpensesCtrl", ["$scope", "localStorageService", "$stateParams", function($scope, localStorageService, $stateParams){
  
  $scope.date = new Date();
  
  $scope.sheets = [];
  
  $scope.getExpenses = function(){
    if(localStorageService.get("expenseData")){
      $scope.sheets = localStorageService.get("expenseData");
    } else {
      $scope.sheets = [];
    }
  }
  
  $scope.addSheet = function(){
    $scope.sheets.unshift({
      phone: $scope.budget,
      contactId: Date.now()
    });
    localStorageService.set("expenseData", $scope.sheets);
    $scope.budget = ""
  }
  
  $scope.updateExpenses = function(){
    localStorageService.set("expenseData", $scope.sheets);
  }
  
  $scope.currentId = $stateParams.id;  
  
  $scope.deleteContact = function(start){
    var confirmDelete = confirm("Are you sure you want to delete this expense sheet?");
    if (confirmDelete) {
      $scope.sheets.splice(start, 1);
      localStorageService.set("expenseData", $scope.sheets);
    }
    localStorageService.set("expenseData", $scope.sheets);
  }
  
}]);