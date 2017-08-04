
'use strict';
define(['Sale'],function(module){
    module.controller('VenueCtrl',['$scope','$http','ipCookie','$location',function($scope,$http,ipCookie,$location){
        var rooturl = 'http://121.42.33.245:1963';
        $scope.VenueList={};
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
                url: rooturl+'/Portal/null_facilityBack!findBySearchFacility?page='+$scope.currentPage+'&Name='+name+'&Values='+value+'&callback=JSON_CALLBACK'
            }).success(function (data) {
                $scope.VenueList = data[0];
                //获取总页数
                $scope.totalPage = Math.ceil($scope.VenueList.Totalsize / $scope.pageSize);
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
            }).error(function(data){
                alert('连接错误')
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
        $scope.GetVenue=function(venueId){
            if(venueId!=0)
            {
                $http.jsonp(rooturl + '/Portal/null_facilityBack!findByOneFacility?id='+venueId+'&callback=JSON_CALLBACK').success(function(data) {
                    $scope.Venue = data;
                });
            }else{
                $scope.Venue={};
            }
        };


        $scope.UpdateVenue=function(venueId){
            var Venue=$scope.Venue;
            $http.jsonp( rooturl + '/Portal/null_facilityBack!UpdateFaclity?Id='+Venue.Id+'&Fcode='+Venue.Fcode+'&Name='+Venue.Name+'&callback=JSON_CALLBACK').
                success(function(data){
                    $('#updateVenue').modal('hide'); //关闭模态框
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };

        $scope.AddVenue=function(){
            var Venue = $scope.Venue;
            $http.jsonp( rooturl + '/Portal/null_facilityBack!FacilitySave?Fcode='+Venue.Fcode+'&Name='+Venue.Name+'&callback=JSON_CALLBACK').
                success(function(data){
                    $('#addVenue').modal('hide'); //关闭模态框
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };

        $scope.deleteVenue=function() {
            if (confirm('确定删除吗?'))
            {
                for(var i=0;i<$scope.VenueList.data.length;i++){
                    if($scope.VenueList.data[i].value==true){
                        var venueId=$scope.VenueList.data[i].Id;
                        $http({
                            method:'jsonp',
                            url:rooturl + '/Portal/null_facilityBack!findByRemove?Id='+venueId+'&callback=JSON_CALLBACK'
                        })
                        .success(function(data, status){
                                $scope.load();//刷新数据
                        }).error(function(data){
                                alert('有外键关联不能删除');
                            });
                    }
                }
            }
        }
    }]);
});
