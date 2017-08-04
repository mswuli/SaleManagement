/**
 *
 */
'use strict';
define(['Sale','ToolService'],function(module){
    module.controller('ProductCtrl',['$scope','$http','ToolService','ipCookie','$location',function($scope,$http,ToolService,ipCookie,$location){
        var rooturl = 'http://121.42.33.245:1963';
        $scope.priductList={};
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
                url: rooturl+'/Portal/null_productBackM!searchProduct?page='+$scope.currentPage+'&num='+$scope.pageSize+'&name='+name+'&value='+value+'&callback=JSON_CALLBACK'
            }).success(function (data) {
                $scope.priductList = data;
                //获取总页数
                $scope.totalPage = Math.ceil($scope.priductList.totalcount / $scope.pageSize);
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

        $scope.product={};
        $scope.GetProduct=function(productId){
            $("#list1 option").not("[class]").remove();
            $("#list2 option").not("[class]").remove();
            if(productId!=0)
            {
                $http.jsonp(rooturl + '/Portal/null_orderBack!findByDetailProduct?Id='+productId+'&callback=JSON_CALLBACK').success(function(data) {
                    $scope.product = data[0];
                    $scope.GetVenue();
                });
            }else{
                $scope.product={};
            }
        };

        $scope.Venue={};
        $scope.GetVenue=function(a){
            $http.jsonp(rooturl + '/Portal/null_facilityBack!findBySearchFacility?callback=JSON_CALLBACK').success(function (data) {
                    $scope.Venue = data[0].data;
                if(a!=0){
                    var aa1 = [];
                    if ($scope.product.facilityids.length > 0) {
                        for (var i = 0; i < $scope.Venue.length; i++) {
                            var id = $scope.Venue[i].Id;
                            $.each($scope.product.facilityids, function (k1, v1) {
                                var id1 = v1.fid;
                                if (id == id1) {
                                    aa1.push(i);
                                }
                            });

                        }
                        $.each(aa1, function (k, v) {
                            $scope.Venue.splice(v, 1);
                            for (var j = k + 1; j < aa1.length; j++) {
                                aa1[j] -= 1;
                            }
                        })
                    }
                }
            });
        };

        $scope.UpdateProduct=function(productId){
            var product=$scope.product;
            $http.jsonp( rooturl + '/Portal/null_productBackM!editProduct?id='+product.id+'&name='+product.name+'&des='+product.des+'&originalprice='+product.originalPrice+'&price='+product.price+'&begintime='+product.begintime+'&endtime='+product.endtime+'&recommend='+product.recommend+'&stock='+product.stock+'&onshelf='+product.onShelf+'&callback=JSON_CALLBACK').
                success(function(data){
                    alert('商品修改成功！！');
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };
        $scope.UpdateProperty=function(productId){
            var product=$scope.product;
            $http.jsonp( rooturl + '/Portal/null_productBackM!editProperty?id='+product.id+'&propertyname1='+product.propertyname1+'&propertyitem1='+product.propertyitem1+'&propertyname2='+product.propertyname2+'&propertyitem2='+product.propertyitem2+'&callback=JSON_CALLBACK').
                success(function(data){
                    alert('商品属性修改成功！！');
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };
        $scope.UpdateVenue=function(productId){
            var ops=[];
            var ins="";
            $("#list2 option").each(function(i){
                ins+=this.value+",";// 收集选中项
            })
            if (ins.length!=0) {
                ops.push(ins);// 收集选中项
                $("input[name='ops']").val(ops)
            }
            var product=$scope.product;
            $http.jsonp( rooturl + '/Portal/null_productBackM!editFactility?id='+product.id+'&facilityids='+ops+'&callback=JSON_CALLBACK').
                success(function(data){
                    alert('场馆修改成功！！');
                    $scope.load();//刷新数据
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        };

        $scope.AddProduct=function(){
            var ops=[];
            var ins="";
            $("#list option").each(function(i){
                ins+=this.value+",";// 收集选中项
            })
            if (ins.length!=0) {
                ops.push(ins);// 收集选中项
                $("input[name='ops']").val(ops)
                var product = $scope.product;
                $http.jsonp( rooturl + '/Portal/null_productBackM!addProduct?name='+product.name+'&des='+product.des+'&originalprice='+product.originalprice+'&price='+product.price+'&begintime='+product.begintime+'&endtime='+product.endtime+'&recommend='+product.recommend+'&stock='+product.stock+'&onshelf='+product.onshelf+'&propertyname1='+product.propertyname1+'&propertyitem1='+product.propertyitem1+'&facilityids='+ops+'&callback=JSON_CALLBACK').
                    success(function(data){
                        $('#addProduct').modal('hide'); //关闭模态框
                        $scope.load();//刷新数据
                    }).error(function(data, status){
                        alert("error"+status);
                    }) ;
            }
        };

        $scope.evaluateProduct = function(productId){
            $http.jsonp( rooturl + '/Portal/null_orderBack!findByCommentsProduct?Id='+productId+'&callback=JSON_CALLBACK').
                success(function(data){
                    $scope.priduct=data[0];
                }).error(function(data, status){
                    alert("error"+status);
                }) ;
        }
        $scope.move=ToolService.move;
        $scope.moveall=ToolService.moveall;

    }])
});
