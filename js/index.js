window.addEventListener('load',function(){
    getFade();
    countDown();
    slide();
})
// 头部搜索框渐变
function getFade() {
    var topbar = document.querySelector('#topbar')
    // 获取 头部高度
    // var tpbarHeight = topbar.offsetHeight;
    // console.log(tpbarHeight);
    // 获取轮播图高度
    window.addEventListener('scroll',getOpcity);
    // getOpcity();
    function getOpcity () {
        var scrollPos= getScrollTop();
        // console.log(scrollPos);
        var slideHeight = document.querySelector('#slide').offsetHeight;
        if (scrollPos<slideHeight){
            topbar.style.backgroundColor = 'rgba(255,0,0,'+(scrollPos/slideHeight*0.8)+')';
        }else{
            topbar.style.backgroundColor = 'rgba(255,0,0,0.8)';
        }
    }
    
}
function getScrollTop() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}
// 京东秒杀倒计时
function countDown() {
    var nowTime = new Date();
    var aimTime = new Date('2017-12-22 20:31:00');
    // 转换成 s(秒)
    var totalTime = aimTime.getTime() / 1000;
    var currentTime = nowTime.getTime() / 1000;
    // 倒计时 时间
    var leftTime = Math.floor(totalTime - currentTime);
    var spans = document.querySelectorAll('#seckill .count-down span');
    //  3730s => 1h  mins = parseInt(3700 % 3600 / 60)  sec = parseInt(3700 % 60)
    // console.log(spans);
    var timeId = setInterval(function(){
        leftTime --;
        if(leftTime<0){
            clearInterval(timeId);
            return false;
        }
        var hours = parseInt(leftTime / 60 / 60) ;
        var mins = parseInt(leftTime % 3600 / 60);
        var sec = parseInt(leftTime % 60);
        // console.log(hours,mins,sec);
        spans[0].innerHTML = parseInt(hours / 10);
        spans[1].innerHTML = parseInt(hours % 10);
        spans[3].innerHTML = parseInt(mins / 10);
        spans[4].innerHTML = parseInt(mins % 10);
        spans[6].innerHTML = parseInt(sec / 10);
        spans[7].innerHTML = parseInt(sec % 10);

    } ,1000)
    


}
// 轮播图
function slide() {
    // 原生手写无缝轮播 滑动轮播 实现原理
    var slideWidth = document.querySelector('#slide').offsetWidth;
    // console.log(slideWidth);
    // 1.自动轮播
    var slideUl = document.querySelector('#slide >ul');
    // 导航小圆点    
    var lis = document.querySelectorAll('#slide >ol li');
    
    // 当前轮播索引
    var index = 1;
    // 轮播位移
    var slideX = null;
    var timeId = null;
    // 自动轮播
    function startTime (){
        timeId = setInterval(function(){
            index ++;
            // console.log(index);
            slideX = -index * slideWidth ;
            slideUl.style.transform = 'translateX('+slideX+'px)';
            slideUl.style.transition = 'all 0.3s';
        },1000)
    }
    //  比较low的方法
    // if(index >=9){
    //     // 延迟0.3s执行这段代码，让动画效果走完
    //     setTimeout(function(){
    //         index = 1;
    //         slideX = -index * slideWidth ;
    //         slideUl.style.transform = 'translateX('+slideX+'px)';
    //         slideUl.style.transition = 'none';
    //     },300)
    // }
    
    // ES6中新事件 过渡完成事件 ----完成无缝轮播
    slideUl.addEventListener('transitionend',function(){ 
        if (index >= 9) {
            index = 1;   
            slideUl.style.transform = 'translateX(' + (-index*slideWidth) + 'px)';
            slideUl.style.transition = 'none';     
        }
        if (index <= 0) {
            index = 8;
            slideUl.style.transform = 'translateX(' + (-index*slideWidth) + 'px)';
            slideUl.style.transition = 'none';  
        }
        // slideUl.style.transform = 'translateX(' + (-index*slideWidth) + 'px)';
        // slideUl.style.transition = 'none';      
        //  导航 小圆点更新
        for(var i = 0 ;i<lis.length;i++){
            lis[i].classList.remove('active');
        }
        lis[index-1].classList.add('active');
    })
    
    startTime();
    
    var startX = distanceX = moveX = 0;
    // 滑动开始事件
    slideUl.addEventListener('touchstart',function(e){
        // console.log(e.touches[0].clientX);
        startX = e.touches[0].clientX;
        clearInterval(timeId);
        // console.log('startX:'+startX);
        
    })
    // 滑动移动事件
    slideUl.addEventListener('touchmove',function(e){
        // 触摸清除定时器
        // console.log(e.touches[0].clientX);
        // 触摸位移距离 向左滑动distanceX为负值 向右为正值
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        slideUl.style.transform = 'translateX('+(-index*slideWidth+distanceX)+'px)';
        slideUl.style.transition = 'all 0.2s';
        // console.log('moveX:'+ moveX);
    })
    // 滑动结束事件
    slideUl.addEventListener('touchend',function(e){
        // console.log(e.changedTouches[0].clientX);
        // endX = e.changedTouches[0].clientX;
        // console.log('endX:'+ endX);
        if(Math.abs(distanceX)> (slideWidth / 3) ){
            if(distanceX>0){
                index --;
            }else{
                index ++;
            } 
            slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
            slideUl.style.transition = 'all 0.2s';
        }else{
            slideUl.style.transform = 'translateX('+(-index*slideWidth)+'px)';
            slideUl.style.transition = 'all 0.2s';
        }
        startTime();
        
    })

}

