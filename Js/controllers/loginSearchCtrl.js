'use strict';
define(['Sale'],function(module){
    module.controller('loginSearchCtrl',['$scope','$http','ipCookie','$location',function($scope,$http,ipCookie,$location){
        var rooturl = 'http://121.42.33.245:1963';
        $scope.userList={};
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
                url: rooturl+'/Portal/null_coachBack!loginSearch?page='+$scope.currentPage+'&num='+$scope.pageSize+'&callback=JSON_CALLBACK'
            }).success(function (data) {
                $scope.userList = data;
                //��ȡ��ҳ��
                $scope.totalPage = Math.ceil($scope.userList.count / $scope.pageSize);
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

        $scope.Venue={};
        $scope.GetVenue=function(){
            $http.jsonp(rooturl + '/Portal/null_facilityBack!findBySearchFacility?callback=JSON_CALLBACK').success(function (data) {
                $scope.Venue = data[0].data;
            });
        };

        $scope.user={};
        $scope.addUser=function(a){
            if(a!=0){
                var user = $scope.user;
                if(user.name!=undefined&&user.pwd!=undefined&&user.facilityid!=undefined){
                    $http.jsonp( rooturl + '/Portal/null_coachBack!loginAdd?name='+user.name+'&pwd='+user.pwd+'&facilityid='+user.facilityid+'&callback=JSON_CALLBACK').
                        success(function(data){
                            $('#addUser').modal('hide'); //�ر�ģ̬��
                            $scope.load();//ˢ������
                        }).error(function(data, status){
                            alert("error"+status);
                        }) ;
                }
            }else{
                $scope.user={};
            }
        }


    }])
});
