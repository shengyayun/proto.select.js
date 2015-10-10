(function(window,undefined){
     function ProtoSelect(selectId){            
          var select = document.getElementById(selectId);
          var proto_select_id = "proto_select_" + selectId;
          var del = document.getElementById(proto_select_id);
          if(del != null) 
               del.parentNode.removeChild(del);               
          var proto_select = document.createElement("div");
          proto_select.id = proto_select_id;
          proto_select.className = "proto_select";
          select.parentNode.insertBefore(proto_select,select);
          select.style.display = "none";
          this.select = select;
          this.proto_select = proto_select;
     }
     ProtoSelect.prototype.options = function(){
          var options =  [];
          for(var i = 0;i<this.select.options.length;i++){
               var option = this.select.options[i];
               options.push({text:option.text,value:option.value});
          }
          options[this.select.selectedIndex].selected = true;
          return options;
     }
     ProtoSelect.prototype.init = function(){
          var options = this.options();
          var html = '<div class="proto_select_current">';
          html += '<div class="proto_select_current_input" data-value="">&nbsp;</div>';
          html += '<div class="proto_select_current_arrow">﹀</div>';
          html += '<div class="proto_select_clear"></div></div>';
          html += '<ul class="proto_select_list" style="display:none;">';
          this.selected = null;
          for(var i = 0;i < options.length; i++){
               var option = options[i];
               var value = (option.value+"").replace(/"/g,"'");
               var text = option.text;
               if(option.hasOwnProperty("selected") && option.selected){
                    this.selected = option;
               }
               html += '<li class="proto_select_item" data-value="'+value+'">'+text+'</li>';
          }
          html += '</ul>';
          this.proto_select.innerHTML = html;
     }
     ProtoSelect.prototype.bind = function(){
          function eventBind(a,b,c){
               if(a.addEventListener)    
                    a.addEventListener(b,c,false);
               else if(a.attachEvent)
                    a.attachEvent("on"+b,c)
          }
          var that = this;
          var proto_select = that.proto_select;
          var current = proto_select.getElementsByTagName('div')[0];
          var input = current.getElementsByTagName('div')[0];
          var list = proto_select.getElementsByTagName('ul')[0];               
          if(that.selected != null){
               input.setAttribute("data-value",that.selected.value);
               input.innerHTML = that.selected.text;
          }
          eventBind(that.select,"change",function(){
               input.setAttribute("data-value",this.value);
               input.innerHTML = this.options[this.selectedIndex].text;
          })
          eventBind(current,"click",function(){
               list.style.display = list.style.display == "block"?"none":"block";
          })
          eventBind(list,"click",function(e){
               var li = e.target;
               if(li.className.indexOf("proto_select_item") < 0) return;
               list.style.display = "none";
               var value = li.getAttribute("data-value")
               input.setAttribute("data-value",value);
               input.innerHTML = li.innerHTML;
               that.select.value = value;
               if(list.fireEvent){
                    list.fireEvent('onchange');
               } else if(list.onchange){
                    list.onchange();
               }
          })
     }
     ProtoSelect.prototype.build = function(){
          this.init();
          this.bind();
     }
     window.ProtoSelect = ProtoSelect;
})(window)