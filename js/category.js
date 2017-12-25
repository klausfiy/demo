window.addEventListener('load',function(){
    rightSwiper();
    leftSwiper();
})
function rightSwiper() {
    myScroll = new IScroll('.category-right',{
        scrollX: false,
        scrollY: true,
        scrollbars: true
    });
}
function leftSwiper() {
    myScroll = new IScroll('.category-left',{
        scrollX: false,
        scrollY: true,
        scrollbars: true
    });
}