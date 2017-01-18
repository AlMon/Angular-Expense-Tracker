var et = angular.module("et", ["LocalStorageModule", "xeditable", "ngAnimate", "truncate", "ui.router"]);


et.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "localStorageServiceProvider", function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('expenseTracker');
  $locationProvider.html5Mode(false)
  .hashPrefix('!');
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "views/home.html",
    controller: "SheetCtrl"
  })
  .state("sheet", {
    url: "/:id",
    templateUrl: "views/sheet.html",
    controller: "SheetCtrl"
  });
  
}]);

et.run(function(editableOptions) {
  editableOptions.theme = 'default';
});

et.controller("SheetCtrl", ["$scope", "localStorageService", "$stateParams", "$filter", 
    function($scope, localStorageService, $stateParams, $filter){
  
  $scope.sheets = [];
  $scope.expenses = [];
  
  $scope.getSheets = function(){
    if(localStorageService.get("sheetData")){
      $scope.sheets = localStorageService.get("sheetData");
    } else {
      $scope.sheets = [];
      $scope.expenses = [];
    }
  }
  
  $scope.addSheet = function(){
    $scope.sheets.unshift({
      budget: $scope.budget,
      sheetId: Date.now()
    });
    localStorageService.set("sheetData", $scope.sheets);
    $scope.budget = ""
  }
  
  
  
  $scope.updateSheet = function(){
    localStorageService.set("sheetData", $scope.sheets);
  }
  
  $scope.currentId = $stateParams.id;  
  
  $scope.deleteSheet = function(start){
    var confirmDelete = confirm("Are you sure you want to delete this expense sheet?");
    if (confirmDelete) {
      $scope.sheets.splice(start, 1);
      localStorageService.set("sheetData", $scope.sheets);
    }
    localStorageService.set("sheetData", $scope.sheets);
  }
  
}]);