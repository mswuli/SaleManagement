/**
 * Created by Administrator on 2015/11/3.
 */
define(['Sale'],function(module){
    module.controller('LoginCtrl',['$scope','$location','$http','ipCookie',function($scope,$location,$http,ipCookie){
        $scope.login=function(valid){
            if(!valid){
                alert("参数不合法");
                return;
            }
            var rooturl = 'http://121.42.33.245:1963';
            var user = $scope.user;
            $http({
                method:'jsonp',
                url:rooturl+'/Portal/null_coachBack!loginBack?name='+user.name+'&pwd='+user.pwd+'&callback=JSON_CALLBACK',
            }).success(function(data){
                if(data.success!=0){
                    ipCookie("rtuser", $scope.user);
                    $location.path('/index').replace();
                }else{
                    alert('用户名密码错误');
                }
            }).error(function(){
                alert('用户名密码错误');
            })

       }
    }]);

});
