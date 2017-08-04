/**
 * Created by Administrator on 2015/11/4.
 */
define(['Sale','echarts'],function(module){
    module.controller('MainCtrl',[function(){
            var option = {
                tooltip: {//辅助工具箱（显示）
                    show: true
                },
                legend: {//图列
                    data:['销量']
                },
                xAxis : [//x轴
                    {
                        type : 'category',
                        data : ["鞋子","羽毛球","羽毛球拍","护腕","手环","袜子"]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"bar",
                        "data":[5, 20, 40, 10, 10, 20]
                    }
                ]
            };

            var option1 = {
                title : {
                    text: '本周订单',
                    subtext: '测试数据'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['未付款','已付款','已发货']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : ['10.29','10.30','10.31','11.01','11.02','11.03','11.04']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} 单'
                        }
                    }
                ],
                series : [
                    {
                        name:'未付款',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 10],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'已付款',
                        type:'line',
                        data:[1, 10, 2, 5, 3, 2, 0],
                        markPoint : {
                            data : [
                                {name : '周最低', value : 1, xAxis: 1, yAxis: 10.5}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ]
                        }
                    },
                    {
                        name:'已发货',
                        type:'line',
                        data:[9, 8, 6, 8, 6, 2, 5],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            echarts.init(document.getElementById("line1")).setOption(option1);
            echarts.init(document.getElementById("line2")).setOption(option);
            echarts.init(document.getElementById("line3")).setOption(option1);
            echarts.init(document.getElementById("line4")).setOption(option);

        //})

    }]);
});
