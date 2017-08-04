'use strict';
define(['Sale'],function(module){
    module.controller('PredetermineCtrl',['$scope','$http','$location','ipCookie',function($scope,$http,$location,ipCookie){
        var coachReservationId=$location.search().id
        var rooturl = 'http://121.42.33.245:1963';
        $scope.coachReservationList={};
        $scope.currentPage = 1;
        $scope.totalPage = 1;
        $scope.pageSize = 15;
        $scope.pages = [];
        $scope.endPage = 1;
        $scope.load = function () {
            if(ipCookie("rtuser")==null){
                $location.path('/login').replace();
            }
            $http({
                method: 'jsonp', //get //post
                url: rooturl+'/Portal/null_coachBack!coachReservation?page='+$scope.currentPage+'&num='+$scope.pageSize+'&id='+coachReservationId+'&callback=JSON_CALLBACK'
            }).success(function (data) {
                $scope.coachReservationList = data.data;
                //��ȡ��ҳ��
                $scope.totalPage = Math.ceil($scope.coachReservationList.count / $scope.pageSize);
                $scope.endPage = $scope.totalPage;
                //������������
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
            }).error(function(data){
                alert('���Ӵ���')
            });
        };
        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
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
    }])
});
