/**
 * Created by Administrator on 2015/11/3.
 */
define(['Sale'],function(module){
    module.controller('LeftCtrl',['$scope','ipCookie',function($scope,ipCookie){
        $scope.name=ipCookie("rtuser").name;
        $('li').click(function () {
            var f = this;
            $('li').each(function () {  this.className = this == f ? 'yyactived' : 'noactive'   });
        });
    }]);

});
