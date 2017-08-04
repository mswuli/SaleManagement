/**
 * Created by Administrator on 2015/11/3.
 */
define(['Sale'],function(module){
    module.controller('IndexCtrl',['$location','ipCookie',function($location,ipCookie){
        if(ipCookie("rtuser")==null){
            $location.path('/login').replace();
        }
    }]);

});
