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
    controller: "ExpensesCtrl"
  });
  
}]);

et.run(function(editableOptions) {
  editableOptions.theme = 'default';
});

et.controller("ExpensesCtrl", ["$scope", "localStorageService", "$stateParams", "$filter", 
    function($scope, localStorageService, $stateParams, $filter){
  
  $scope.budget = 0;
  $scope.income = [];
  $scope.expenses = [];
  
  $scope.getExpenses = function(){
    if(localStorageService.get("expenseData")){
      $scope.budget = localStorageService.get("budgetData");
      $scope.income = localStorageService.get("incomeData");
      $scope.expenses = localStorageService.get("expenseData");
    } else {
      $scope.budget = 0;
      $scope.income = [];
      $scope.expenses = [];
    }
  }
  

  
  $scope.addExpense = function(){
    $scope.expenses.unshift({
      description: $scope.description,
      amount: $scope.amount
    });
    localStorageService.set("expenseData", $scope.expenses);
    $scope.description = "";
    $scope.amount = "";
  }
  
  $scope.updateBudget = function(){
    localStorageService.set("expenseData", $scope.expenses);
    localStorageService.get("incomeData", $scope.income);
  }
  
  $scope.deleteIncome = function(start){
    var confirmDelete = confirm("Are you sure you want to delete this expense?");
    if (confirmDelete) {
      $scope.income.splice(start, 1);
      localStorageService.get("incomeData", $scope.income);
      }
      localStorageService.get("incomeData", $scope.income);
  }
  
  $scope.deleteExpense = function(start){
    var confirmDelete = confirm("Are you sure you want to delete this expense?");
    if (confirmDelete) {
      $scope.expenses.splice(start, 1);
      localStorageService.set("expenseData", $scope.expenses);
    }
    localStorageService.set("expenseData", $scope.expenses);
  }
  
}]);