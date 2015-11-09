/**
 * Created by Ren on 2014-10-26.
 */


var myApp = angular.module('Chat', [
    'ui.router',
    'appCtrl'
]);

myApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .state('chat', {
            url: '/chat?id',
            templateUrl: 'chat.html',
            controller: 'chatCtrl'
        })
        .state('editAcc', {
            url: '/editAcc',
            templateUrl: 'editAcc.html',
            controller: 'editAcc'
        })
        .state('test', {
            url: '/test',
            templateUrl: 'test.html'
        });
});

