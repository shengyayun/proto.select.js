//如果id为selct的元素已经是select插件对象，则返回select对象，否则初始化为select插件对象
var select = new ProtoSelect("select",options);

select.change(function(){
	//绑定change事件
});

//取值
select.val();
select.value


//初始化
var options = [];
options.push({text:"请选择",value:0,selected:true});
options.push({text:"正常",value:1});
options.push({text:"锁定",value:2});
var select = new ProtoSelect("select",options);