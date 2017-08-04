'use strict';
define(['Sale'],function(module){
    module.controller('EvaluateCtrl',['$scope','$http','$location','ipCookie',function($scope,$http,$location,ipCookie){
        var productId=$location.search().id
        var rooturl = 'http://121.42.33.245:1963';
        $scope.product={};
               $scope.load = function () {
                   if(ipCookie("rtuser")==null){
                       $location.path('/login').replace();
                   }
                   $http({
                       method:'jsonp',
                       url:rooturl+'/Portal/null_orderBack!findByCommentsProduct?Id='+productId+'&callback=JSON_CALLBACK'
                   }).success(function(data){
                       $scope.product=data[0];
                   })
               }
        $scope.load();
    }])
});
