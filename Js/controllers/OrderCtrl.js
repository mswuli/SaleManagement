/**
 *
 *
 */
'use strict';
define(['Sale'],function(module){
    module.controller('OrderCtrl',['$scope','$http','ipCookie','$location',function($scope,$http,ipCookie,$location){
        var rooturl = 'http://121.42.33.245:1963';
        $scope.OrderList={};
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.pageSize = 15;
        $scope.pages = [];
        $scope.endPage = 1;
        $scope.load = function (a) {
            if(ipCookie("rtuser")==null){
                $location.path('/login').replace();
            }
            var value = $scope.value;
            if(value==undefined){
                value='';
            }
            var name =$scope.name;
            if(name==undefined){
                name='';
            }
            if(a==0){
                $scope.currentPage = 1;
            }
            $http({
                method: 'jsonp', //get //post
                url: rooturl+ '/Portal/null_orderBack!findBySearchOrder?page='+$scope.currentPage+'&values='+value+'&Name='+name+'&callback=JSON_CALLBACK'
            }).success(function (data) {
                $scope.OrderList = data[0];
                //获取总页数
                $scope.totalPage = Math.ceil($scope.OrderList.Totalsize / $scope.pageSize);
                $scope.endPage = $scope.totalPage;
                //生成数字链接
                if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
                    $scope.pages = [
                        $scope.currentPage - 1,
                        $scope.currentPage,
                        $scope.currentPage + 1
                    ];
                } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
                    $scope.pages = [
                        $scope.currentPage,
                        $scope.currentPage + 1
                    ];
                } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
                    $scope.pages = [
                        $scope.currentPage - 1,
                        $scope.currentPage
                    ];
                }
            });
        };


        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage ) {
                $scope.currentPage++;
                $scope.load();
            }
        };

        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                $scope.load();
            }
        };

        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.load();
        };
        $scope.load();


        $scope.Order={};
        $scope.OrderVenue={};
        $scope.GetOrder=function(orderId){
            if(orderId!=0)
            {
                $http.jsonp(rooturl + '/Portal/null_orderBack!findByDetailOrder?Id='+orderId+'&callback=JSON_CALLBACK').success(function(data) {
                    $scope.Order = data[0];
                    $scope.OrderVenue = data[0].data;
                });
            }else{
                $scope.Order={};
                $scope.OrderVenue={};
            }
        };
    }]);
});
