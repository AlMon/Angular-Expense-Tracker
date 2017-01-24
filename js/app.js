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
  $scope.incomes = [];
  $scope.expenses = [];
  
  $scope.getBudget = function(){
    if(localStorageService.get("expenseData") && localStorageService.get("incomeData") && localStorageService.get("budgetData")){
      $scope.budget = localStorageService.get("budgetData");
      $scope.incomes = localStorageService.get("incomeData");
      $scope.expenses = localStorageService.get("expenseData");
    } else {
      $scope.budget = 0;
      $scope.incomes = [];
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
  
  $scope.addIncome = function(){
    $scope.incomes.unshift({
      indesc: $scope.indesc,
      inam: $scope.inam
    });
    localStorageService.set("incomeData", $scope.incomes);
    $scope.desc = "";
    $scope.ina = "";
  }
  
  $scope.updateBudget = function(){
    localStorageService.set("expenseData", $scope.expenses);
    localStorageService.get("incomeData", $scope.incomes);
  }
  
  $scope.deleteExpense = function(start){
    var confirmDeleteExpense = confirm("Are you sure you want to delete this expense?");
    if (confirmDeleteExpense) {
      $scope.expenses.splice(start, 1);
      localStorageService.set("expenseData", $scope.expenses);
    }
    localStorageService.set("expenseData", $scope.expenses);
  }
  
  $scope.deleteIncome = function(begin){
    var confirmDeleteIncome = confirm("Are you sure you want to delete this income?");
    if (confirmDeleteIncome) {
      $scope.incomes.splice(begin, 1);
      localStorageService.get("incomeData", $scope.incomes);
      }
      localStorageService.get("incomeData", $scope.incomes);
  }
  
}]);