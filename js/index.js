$(function(){
	var $musicWrap = $('#wrap .music');
	var audio = document.querySelector('audio');
	var $listWrap = $('#wrap .list');
	var $list = $('#wrap .list > li');
	
	
	var now = 0;
	var old = 0;
	var startY = 0;
	var endY = 0;
	var disY = 0;
	
	var outInAn = [
		//list1 动画
		{
			inAn:function(){
				var list1s = $('#wrap .list ul>li');
				list1s[0].style.transform = "translate(0)";
				list1s[1].style.transform = "translate(0)";
				list1s[2].style.transform = "translate(0)";
				list1s[3].style.transform = "translate(0)";
				console.log('动画1入场')
			},
			outAn:function(){
				var list1s = $('#wrap .list ul>li');
				list1s[0].style.transform = "translate(-400px)";
				list1s[1].style.transform = "translate(400px)";
				list1s[2].style.transform = "translate(-400px)";
				list1s[3].style.transform = "translate(400px)";
			}
		},
		//list2 动画
		{	
			inAn:function(){
				var list2s = $('#wrap .list .list2 ul>li');
				/*for(var i=0;i<list2s.length;i++){
					list2s[i].style.transform = 'rotate(720deg)';
				}*/
				console.log('list2int')
				/*list2s[0].style.top = 30 + '%';
                list2s[1].style.top = 40 + '%';
                list2s[1].style.left = 60 + '%';
                list2s[2].style.top = 65 + '%';
                list2s[2].style.left = 60 + '%';
                list2s[3].style.top = 75 + '%';
                list2s[4].style.top = 65 + '%';
                list2s[4].style.left = -60 + '%';
                list2s[5].style.top = 40 + '%';
                list2s[5].style.left = -60 + '%';*/
                list2s[0].style.transform = "translate(0,-180%) rotate(720deg)";
                list2s[1].style.transform = "translate(180%,-90%) rotate(720deg)";
                list2s[2].style.transform = "translate(-180%,-90%) rotate(720deg)";
                list2s[3].style.transform = "translate(0,180%) rotate(720deg)";
                list2s[4].style.transform = "translate(180%,90%) rotate(720deg)";
                list2s[5].style.transform = "translate(-180%,90%) rotate(720deg)";
                
                console.log('动画2入场')
			},
			outAn:function(){
				console.log('list2intOut')
				var list2s = $('#wrap .list .list2 ul>li');
				for(var i=0;i<list2s.length;i++){
					/*list2s[i].style.transform = 'rotate(0)';
					list2s[i].style.top = '0';
					list2s[i].style.left = '0';*/
					list2s[i].style.transform = "translate(0,0) rotate(0deg)"
				}
			}
		},
		//list3 动画
		{
			inAn: function () {
                var imgRotate = $('#wrap .list .list3 .imgRotate');
                imgRotate.css('transform','rotateY(720deg)')
                console.log('动画3入场')
            },
            outAn: function () {
                var imgRotate = $('#wrap .list .list3 .imgRotate');
                imgRotate.css('transform','rotateY(0deg)')
            }
            
		},
		//list4 动画
		{
			inAn:function(){
				var list4s = $('#wrap .list .list4>div');
				list4s[0].style.width = 6.5+'rem';
				list4s[0].style.height = 7.1+'rem';
				list4s[1].style.width = 7.4+'rem';
				list4s[1].style.height = 4.5+'rem';
				list4s[2].style.width = 3.3+'rem';
				list4s[2].style.height = 8.3+'rem';
				console.log('动画4入场')
			},
			outAn:function(){
				var list4s = $('#wrap .list .list4>div');
				for (var i = 0; i < list4s.length; i++) {
					list4s[i].style.width = 0;
					list4s[i].style.height = 0;
				}
			}
		},
		//list5 动画
		{
			inAn:function(){
				console.log('动画5入场')
			},
			outAn:function(){
				
			}
		}
	];
	
	//动画入场设置
	outInAn.forEach(function(item,index){
		outInAn[index]['outAn']();
	})
	
	$('canvas').on('transitionend',function(){		
		outInAn[0]['inAn']();
	})
	
	//先第一屏显示
	$list[0].style.display = 'block';
	
	//音乐控制
	$musicWrap.click(function(){
		if( audio.paused){	//如果暂停 点一下可播放
			 audio.play();
		}else{
			 audio.pause();
		}
	})
	
	$listWrap.on('touchstart',function(ev){
		ev = ev||event;
		var touch = event.changedTouches[0];
		startY = touch.clientY;

	})
	$listWrap.on('touchmove',function(ev){
		ev = ev||event;
		var touch = event.changedTouches[0];
		endY = touch.clientY;
		disY = endY - startY;			
		})
		
	$listWrap.on('touchend',function(ev){
		ev = ev||event;
		now += disY>0? -1:1;
		
		if(now <0 ){
			now=0;
			return;
		}else if(now>4){
			now = 4;
			return;
		}
		console.log(now);
		move(now);		
	})
	
	//移动函数
	function move(index){
		var listH = document.querySelector('#wrap .list').offsetHeight;
		//$list[old].style.display = "none";
		$($list[old]).fadeOut(1000);
		
		//$list[old].style.transform = 'translateY('+ (-listH)+'px)';
		
		//$list[index].style.display = "block";
		$($list[index]).fadeIn(1000);
		//$list[index].style.transform = 'translateY('+ listH +'px)';

		if(outInAn[index]['inAn']){
			setTimeout(function(){
				outInAn[index]['inAn']();
			},1000)
		}
		outInAn[old]['outAn']();
		//更新出场坐标
		old = index;
		
	}
	
	
})