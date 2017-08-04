/**
 * Created by Administrator on 2015/11/3.
 */
define(['Sale'],function(module){
    module.controller('HeadCtrl',['$scope','$location','ipCookie',function($scope,$location,ipCookie){
       $scope.logout=function(){
           if(window.confirm('您确定要退出吗？')) {
               $location.path('/login').replace();
                   ipCookie.remove("rtuser");
           }
       }
    }]);

});
