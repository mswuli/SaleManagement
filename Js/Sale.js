/**
 * 总路由文件，项目入口文件
 *
 * date
 */

'use strict';
define([
    'angular',
    'angularRoute',
    'angularUiRoute',
    'moment',
    'angularMoment',
    'angularMessages',
    'zhCh'
],function(angular){
    var module=angular.module('Sale',['ngRoute','ngMessages','angularMoment','ui.router','ipCookie']);
    //启动文件
/*    module.run(function($window, $rootScope, $http, $location){
     });*/
    //路由
    module.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/login");
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'login.html',
                        controller:'LoginCtrl'
                    },
                }
            })
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'pages/index.html',
                        controller:'IndexCtrl'
                    },
                    'head@index': {
                        templateUrl: 'pages/head.html',
                        controller:'HeadCtrl'
                    },
                    'left@index': {
                        templateUrl: 'pages/left.html',
                        controller:'LeftCtrl'
                    },
                    'main@index': {
                        templateUrl: 'pages/main.html',
                        controller:'MainCtrl'
                    }
                }
            })
            .state("index.Product", {
                url: "/Product",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Product.html',
                        controller:'ProductCtrl'
                    }
                }
            })

            .state("index.Order", {
                url: "/Order",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Order.html',
                        controller:'OrderCtrl'
                    }
                }
            })
            .state("index.Venue", {
                url: "/Venue",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Venue.html',
                        controller:'VenueCtrl'
                    }
                }
            })
            .state("index.Product.evaluate", {
                url: "/evaluate?id",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Product/evaluate.html',
                        controller:'EvaluateCtrl'
                    }
                }
            })
            .state("index.loginSearch", {
                url: "/loginSearch",
                views: {
                    'main@index': {
                        templateUrl: 'pages/loginSearch.html',
                        controller:'loginSearchCtrl'
                    }
                }
            })
            .state("index.Coach", {
                url: "/Coach",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Coach.html',
                        controller:'CoachCtrl'
                    }
                }
            })
            .state("index.Coach.EvaluateCoach", {
                url: "/EvaluateCoach?id",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Coach/EvaluateCoach.html',
                        controller:'EvaluateCoachCtrl'
                    }
                }
            })
            .state("index.Coach.Predetermine", {
                url: "/Predetermine?id",
                views: {
                    'main@index': {
                        templateUrl: 'pages/Coach/Predetermine.html',
                        controller:'PredetermineCtrl'
                    }
                }
            })

    }]);
    return module;
});


