# jquery.btnclock
--------------------------
依赖于Jquery的按钮时钟，在点击按钮，进行指定时间的倒计时
--------------------------
```
例子1：          

       <div class="btnclock">发送</div>
       
       <script type="text/javascript">
       
          var btnClock = $.newBtnClock({
              "btnSelecter":'.btnclock',
              "timeCounter":5,
              'btnNormalText':'发送',
              "btnClockText":'还有{0}秒',
       
          });
       
          $('.btnclock').click(function(){
       
              if(!btnClock.isSendable){
                  return false;
              }
       
              btnClock.startClock();
       
              $.post("htt://www.domain.com/member/passport/sendmailcode')}",{},function(data){
                  
                  if(data.status != 1){
                      btnClock.reset();
                  }
                  
              },'json');
       
              return false;
          });
       
       </script>


例子2：

       <div class="btnclock btn1">发送</div>
       <div class="btnclock btn2">发送</div>
       <div class="btnclock btn3">发送</div>

       <script type="text/javascript">
           $('.btnclock').bindBtnClock({
               "btnSelecter":'.btnclock',
               "timeCounter":5,
               'btnNormalText':'发送',
               "btnClockText":'还有{0}秒',
               "callbackFunc":function(btnClock){

                   $.post("{:U('member/passport/sendmailcode')}",{},function(data){

                       if(data.status != 1){

                           btnClock.reset();

                       }

                   },'json');

           }});
       </script>
```
