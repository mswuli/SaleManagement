define(['Sale'],function(module){
    module.factory("ToolService",[function($scope){
        var sortitems = 1; // Automatically sort items within lists? (1 or 0)
        var tool={
            move: function(event,flag) {
                var fbox="",tbox="";
                if(flag==1){
                    fbox=$(event.target).parents("form").find("select[name='list1']").get(0);
                    tbox=$(event.target).parents("form").find("select[name='list2']").get(0)
                }else{
                    fbox=$(event.target).parents("form").find("select[name='list2']").get(0);
                    tbox=$(event.target).parents("form").find("select[name='list1']").get(0)
                }
                for ( var i = 0; i < fbox.options.length; i++) {
                    if (fbox.options[i].selected && fbox.options[i].value != "") {
                        var no = new Option();
                        no.value = fbox.options[i].value;
                        no.text = fbox.options[i].text;
                        tbox.options[tbox.options.length] = no;
                        fbox.options[i].value = "";
                        fbox.options[i].text = "";
                    }
                }
                tool.BumpUp(fbox);
                if (sortitems)
                    tool.SortD(tbox);
            },
            moveall:function(event,flag) {
                var fbox="",tbox="";
                if(flag==1){
                    fbox=$(event.target).parents("form").find("select[name='list1']").get(0);
                    tbox=$(event.target).parents("form").find("select[name='list2']").get(0)
                }else{
                    fbox=$(event.target).parents("form").find("select[name='list2']").get(0);
                    tbox=$(event.target).parents("form").find("select[name='list1']").get(0)
                }
                for ( var i = 0; i < fbox.options.length; i++) {
                    if (fbox.options[i].value != "") {
                        var no = new Option();
                        no.value = fbox.options[i].value;
                        no.text = fbox.options[i].text;
                        tbox.options[tbox.options.length] = no;
                        fbox.options[i].value = "";
                        fbox.options[i].text = "";
                    }
                }
                tool.BumpUp(fbox);
                if (sortitems)
                    tool.SortD(tbox);
            },
            BumpUp: function(box) {
                for ( var i = 0; i < box.options.length; i++) {
                    if (box.options[i].value == "") {
                        for ( var j = i; j < box.options.length - 1; j++) {
                            box.options[j].value = box.options[j + 1].value;
                            box.options[j].text = box.options[j + 1].text;
                        }
                        var ln = i;
                        break;
                    }
                }
                if (ln < box.options.length) {
                    box.options.length -= 1;
                    tool.BumpUp(box);
                }
            },
            SortD:function(box) {
                var temp_opts = new Array();
                var temp = new Object();
                for ( var i = 0; i < box.options.length; i++) {
                    temp_opts[i] = box.options[i];
                }

                for ( var x = 0; x < temp_opts.length - 1; x++) {
                    for ( var y = (x + 1); y < temp_opts.length; y++) {
                        if (temp_opts[x].text > temp_opts[y].text) {
                            temp = temp_opts[x].text;
                            temp_opts[x].text = temp_opts[y].text;
                            temp_opts[y].text = temp;
                            temp = temp_opts[x].value;
                            temp_opts[x].value = temp_opts[y].value;
                            temp_opts[y].value = temp;
                        }
                    }
                }

                for ( var i = 0; i < box.options.length; i++) {
                    box.options[i].value = temp_opts[i].value;
                    box.options[i].text = temp_opts[i].text;
                }
            },
        };
        return tool;

    }]);
});