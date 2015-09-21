function ProtoSelect(id,options){
     if(typeof ProtoSelect.prototype.InstancePool == "undefined"){
          ProtoSelect.prototype.InstancePool = {};
     }
     if(typeof ProtoSelect.prototype.InstancePool[id] != "undefined")
          return ProtoSelect.prototype.InstancePool[id];
     if(typeof this.InstancePool == "undefined")
          throw "excute it with new";
     var select = document.getElementById(id);    
     select.className += "proto_select";
     var html = '<div class="proto_select_current">';
     html += '<div class="proto_select_current_input" data-value="">&nbsp;</div>';
     html += '<div class="proto_select_current_arrow">﹀</div>';
     html += '<div class="proto_select_clear"></div></div>';
     html += '<ul class="proto_select_list" style="display:none;">';
     var selected = null;
     for(var i = 0;i < options.length; i++){
          var option = options[i];
          var value = (option.value+"").replace(/"/g,"'");
          var text = option.text;
          if(option.hasOwnProperty("selected") && option.selected){
               selected = option;
          }
          html += '<li class="proto_select_item" data-value="'+value+'">'+text+'</li>';
     }
     html += '</ul>';
     select.innerHTML = html;
     var current = select.getElementsByTagName('div')[0];
     var input = current.getElementsByTagName('div')[0];
     var list = select.getElementsByTagName('ul')[0];    
     var that = this;
     function save(){
          that.value = input.getAttribute("data-value");
          that.text = input.innerHTML;
     }
     this.val = function(){
          return that.value;
     }
     this.change = function(func){
          that.onChange = func;
     }
     if(selected != null){
          input.setAttribute("data-value",selected.value);
          input.innerHTML = selected.text;
          save();
     }         
     function eventBind(a,b,c){
          if(a.addEventListener)    
               a.addEventListener(b,c,false);
          else if(a.attachEvent)
               a.attachEvent("on"+b,c)
     }
     eventBind(current,"click",function(){
          list.style.display = list.style.display == "block"?"none":"block";
     })
     eventBind(list,"click",function(e){
          var li = e.target;
          if(li.className.indexOf("proto_select_item") < 0) return;
          list.style.display = "none";
          var value = li.getAttribute("data-value")
          input.setAttribute("data-value",li.getAttribute("data-value"));
          input.innerHTML = li.innerHTML;
          save();
          if(typeof that.onChange != "undefined")
               that.onChange(value);
     })
     ProtoSelect.prototype.InstancePool[id] = this;
     return ProtoSelect.prototype.InstancePool[id];
}