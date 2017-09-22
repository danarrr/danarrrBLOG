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

let _altBox=(text)=>{
    let $bg= $("#bg-opa-black"),
        $altbox=$("#altbox"),
        $altboxInfo=$("#altbox span");
    $altboxbg.fadeIn();$altbox.fadeIn();$altboxInfo.html(text)
    setTimeout(function(){$altboxbg.fadeOut();$altbox.fadeOut()} ,2000)
}

let _txtBox=(text)=>{
    let $bg= $("#bg-opa-black"),
        $txtBox=$("#textbox");


    $bg.fadeIn();$txtBox.fadeIn();$txtBox.html(text);
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
