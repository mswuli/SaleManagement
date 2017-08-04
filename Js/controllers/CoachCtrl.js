'use strict';
define(['Sale'],function(module){
    module.controller('CoachCtrl',['$scope','$http','ipCookie','$location',function($scope,$http,ipCookie,$location){
        var rooturl = 'http://121.42.33.245:1963';
        $scope.coachList={};
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
                url: rooturl+'/Portal/null_coachBack!coachSearch?page='+$scope.currentPage+'&num='+$scope.pageSize+'&name='+name+'&value='+value+'&callback=JSON_CALLBACK'
            }).success(function (data) {
                $scope.coachList = data;
                //获取总页数
                $scope.totalPage = Math.ceil($scope.coachList.count / $scope.pageSize);
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

        $scope.AddCoach=function(){
            alert(11)
            var Coach = $scope.Coach;
            $http.jsonp( rooturl + '/Portal/null_coachBack!coachAdd?level='+Coach.level+'&facilityid='+Coach.facilityid+'&position='+Coach.position+'&name='+Coach.name+'&gender='+Coach.gender+'&specialty='+Coach.specialty+'&certificate='+Coach.certificate+'&callback=JSON_CALLBACK').
                success(function(data){
                    $('#addCoach').modal('hide'); //关闭模态框
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };

        $scope.Venue={};
        $scope.GetVenue=function(){
            $http.jsonp(rooturl + '/Portal/null_facilityBack!findBySearchFacility?callback=JSON_CALLBACK').success(function (data) {
                $scope.Venue = data[0].data;
            });
        };

        $scope.Coach={};
        $scope.GetCoach=function(CoachId){
            if(CoachId!=0){
                $http.jsonp( rooturl + '/Portal/null_coachBack!coachDetail?id='+CoachId+'&callback=JSON_CALLBACK').
                    success(function(data){
                        $scope.Coach=data;
                        $scope.GetVenue();
                    }).error(function(data, status){
                        alert("error"+status);
                    }) ;
            }else{
                $scope.Coach={};
            }
        }

        $scope.UpdateCoach=function(CoachId){
            var Coach=$scope.Coach;
            $http.jsonp( rooturl + '/Portal/null_coachBack!coachEdit?id='+Coach.id+'&position='+Coach.position+'&name='+Coach.name+'&gender='+Coach.gender+'&level='+Coach.level+'&ename='+Coach.ename+'&facilityid='+Coach.facilityid+'&specialty='+Coach.specialty+'&certificate='+Coach.certificate+'&callback=JSON_CALLBACK').
                success(function(data){
                    $('#updateCoach').modal('hide'); //关闭模态框
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };

        $scope.deleteCoach=function() {
            if (confirm('确定删除吗?'))
            {
                for(var i=0;i<$scope.coachList.data.length;i++){
                    if($scope.coachList.data[i].value==true){
                        var coachId=$scope.coachList.data[i].id;
                        $http({
                            method:'jsonp',
                            url:rooturl + '/Portal/null_coachBack!coachDelete?id='+coachId+'&callback=JSON_CALLBACK'
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

    }])
});
