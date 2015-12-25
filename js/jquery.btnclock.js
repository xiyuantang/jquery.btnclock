/********************************************
 * 	  time: 	2015-11-03 15:34
 * company: 	bizcn
 *  author: 	zhazhou
 ********************************************/
/**
 	usage:
	 	demo1:
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
	
	 	demo2:
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
 */
(function($){
	var BtnClock = function(configParam){
		this.defaultConfig = {
				'btnSelecter':'#sendCode',
				'timeCounter':60,
				'btnNormalText':'发送',
				'btnClockText':'{0}秒',
		};
		this.timeCounter = 60;
		this.config = {};
		this.isSendable = true;
		this.setTimeoutHandler = null;
		
		this.empty = function(data){
			if(typeof data=="undefined"||data==null||data==''){
				return true;
			}
			return false;
		};
		
		// 配置选项
		this.initOptions = function(configParam){
			if(!this.empty(configParam['timeCounter'])){
				configParam['timeCounter'] = parseInt(configParam['timeCounter']);
			}
			this.config = $.extend({},this.defaultConfig,configParam);	
		};
		this.initOptions(configParam);
		
		//定时器
		this.setTimeoutFunc = function(thisTemp){
			thisTemp.myClearTimeout();
			thisTemp.isSendable = false;
			if(thisTemp.timeCounter==0){
				$(thisTemp.config['btnSelecter']).html(thisTemp.config['btnNormalText']);
				thisTemp.isSendable = true;
				
			}
			else{
				//显示文本
				var showText = thisTemp.config['btnClockText'].replace("{0}",thisTemp.timeCounter);
				$(thisTemp.config['btnSelecter']).html(showText);
				//...
				thisTemp.timeCounter = thisTemp.timeCounter - 1;
				thisTemp.setTimeoutHandler = setTimeout(function() {
					thisTemp.setTimeoutFunc(thisTemp);
				},1000);	
			}
		}
		
		this.myClearTimeout = function() {
			clearTimeout(this.setTimeoutHandler);
		};
		
		this.init = function() {
			this.myClearTimeout();
			this.isSendable = true;
			this.timeCounter = this.config['timeCounter'];
			$(this.config['btnSelecter']).html(this.config['btnNormalText']);
		};
			
		this.run = function() {
			this.setTimeoutFunc(this);
		};
		
		this.startClock = function(){
			this.init();
			this.run();
		};
		
		this.reset = function() {
			this.init();
		};
	};
	
	$.extend({
		newBtnClock: function(configParam) {
			return new BtnClock(configParam);
		},
	});  
	
	jQuery.fn.extend({
		bindBtnClock: function(configParam) {
			return this.each(function() { 
				var btnClock = $(this).data('data-btnclock');
				if(btnClock){
					return true;
				}
				//检查参数
				configParam['btnSelecter'] = this;
				//创建对象，绑定对象
				$(this).data('data-btnclock',new BtnClock(configParam));
				$(this).click(function(){
					var btnClock = $(this).data('data-btnclock');
					if(btnClock){
						if(!btnClock.isSendable){
							return false;
						}
						btnClock.startClock();
						var funcHadler = btnClock.config['callbackFunc'];
						if(typeof funcHadler!="undefined"){
							funcHadler(btnClock);
							// btnClock.reset();
						}
						return false;
					}
				});
			});
		}
	});
})(jQuery);