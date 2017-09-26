//跨域请求
// var contentType ="application/x-www-form-urlencoded; charset=utf-8";
// if(window.XDomainRequest)contentType = "text/plain";
let $ajax = function (url,data, fun, type) {
    if(!type)type='get';
    $.ajax({
        url:url,
        data:data,
        type:type,
        dataType:"json",
        // contentType:contentType,
        success:function (data) {
            fun(data);
        },
        error:function (err) {
            console.log(err.toString());
        }
    })
};
$('#bgBasis').click(()=>{
    $('#bgBasis').fadeOut()
})

$('#bgBasis>div').click((event)=>{
   event.stopPropagation()
})

let _altBox=(text,callback)=>{
    let altbox=`
        <div id="bgBasis">
            <div id="altbox">
                <h5>提示</h5>
                <span>${text}</span></br>
            </div>
        </div>
        `
    $("head").after(altbox)
    let $bg= $("#bgBasis"),
        $altbox=$("#altbox"),
        $altboxInfo=$("#altbox span");
    $bg.fadeIn();$altbox.fadeIn();$altboxInfo.html(text)
    setTimeout(function(){$bg.fadeOut();$altbox.fadeOut();$altbox.fadeOut()} ,1500)
    if(callback){setTimeout(callback(),2000)}
}
/*判断滚动条到顶部距离*/
let getScrollTop=()=>{
    var scrollPos;
    if (window.pageYOffset) {
    scrollPos = window.pageYOffset; }
    else if (document.compatMode && document.compatMode != 'BackCompat')
    { scrollPos = document.documentElement.scrollTop; }
    else if (document.body) { scrollPos = document.body.scrollTop; }
    return scrollPos;
}
/*rem换算*/
(function(){
    function fontSizeInit() {
        var a = document.documentElement,
            b = a.clientWidth;
        b && (b /= 300, 2.5 < b && (b = 2.5), a.style.fontSize = 40 * b + "px")
    }
    window.addEventListener('load',fontSizeInit);
    window.addEventListener('resize',fontSizeInit);
})();
