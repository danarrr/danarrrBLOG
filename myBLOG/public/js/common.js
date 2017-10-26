//跨域请求
var contentType ="application/x-www-form-urlencoded; charset=utf-8";
if(window.XDomainRequest)contentType = "text/plain";
let $ajax=(url, data, fun, type)=>{
    if (!type) type = 'get';
    $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: "json",
        contentType:contentType,//304返回码
        success: function(data) {
            fun(data);
        },
        error: function(err) {
            console.log(err.toString());
        }
    })
};
$('#bgBasis').click(() => {
    $('#bgBasis').fadeOut()
})

$('#bgBasis>div').click((event) => {
    event.stopPropagation()
})

let _altBox = (text, callback) => {
    let altbox = `
        <div id="bgBasis">
            <div id="altbox">
                <h5>提示</h5>
                <span>${text}</span></br>
            </div>
        </div>
        `
    $("head").after(altbox)
    let $bg = $("#bgBasis"),
        $altbox = $("#altbox"),
        $altboxInfo = $("#altbox span");
    $bg.fadeIn();
    $altbox.fadeIn();
    $altboxInfo.html(text)
    setTimeout(function() {
        $bg.fadeOut();
        $altbox.fadeOut();
        $altbox.fadeOut()
    }, 1500)
    if (callback) { setTimeout(callback(), 2000) }
}


/*判断滚动条到顶部距离*/
let getScrollTop = () => {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    } else if (document.compatMode && document.compatMode != 'BackCompat') { scrollPos = document.documentElement.scrollTop; } else if (document.body) { scrollPos = document.body.scrollTop; }
    return scrollPos;
}
/*rem换算*/
(function() {
    function fontSizeInit() {
        var a = document.documentElement,
            b = a.clientWidth;
        b && (b /= 300, 2.5 < b && (b = 2.5), a.style.fontSize = 40 * b + "px")
    }
    window.addEventListener('load', fontSizeInit);
    window.addEventListener('resize', fontSizeInit);
})();

/*下拉加载更多*/
/*
  requestAnimationFrame 兼容性代码
 */

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());



/*触底监听加载更多*/
let main = document.getElementById('articleList'),
    page =1
//触底监听
function checkBottom() {
    if ( window.scrollY+475 < main.clientHeight) {
        moreList();
    } else {
        window.requestAnimationFrame(checkBottom);
    }
}

function moreList() {
    console.log("快到底了")
    var callback = function(data) {
        let datas = data.data
        if(datas.length>0){
            $("#loadingMore").html("加载中")
            articleListHTML(datas,(articleListData)=>{ $('#articleList').append(articleListData)})
            window.requestAnimationFrame(checkBottom)

        }else{
            $("#loadingMore").html("暂时没有更多文章啦~")
        }
    }
    var errorCallback
    ajaxLoadmore(callback, errorCallback);

}
function articleListHTML(datas,callback){
        let articleListData = '';
        datas.map((item, index) => {
            let createTime = item.meta.createAt.substr('0', '10')
            let article = item.articleShort
            articleListData += `
                <div class="list" >
                    <h3 class="list-tit" data-articalId="${datas[index]._id}">${item.title}</h3>
                    <div class="row">
                        <div class="list-left col-sm-3 col-xs-12">
                            <span class="icon-time" >${createTime}</span>
                            <span class="icon-type"> ${item.artiType}</span>
                            <span class="icon-read"> ${item.author}</span>
                        </div>
                        <div class="list-right col-sm-9 col-xs-12 showArticleMain" >${article}</div>
                    </div>
                </div>
            `
        })
        callback(articleListData)
}
// 接口请求
function ajaxLoadmore(callback, errorCallback) {
    page=page+1
    $ajax('/api/getArticleList', { usrname: 'danarrr', page: page, pageNum: 4 }, (data)=> {
        var res = data;
        callback(res);
    })
}
function IsPC(){
   var userAgentInfo = navigator.userAgent;
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
   var flag = true;
   for (var v = 0; v < Agents.length; v++) {
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
   }
   return flag;
}

//获取地址栏参数
function __getURLData() {
  if(!location.search)return false;
  var arr = location.search.split(/\?|&/),data = {},nA = [];
  for(var a=0,l=arr.length;a<l;a++){
    if(arr[a].match('=')){
      nA = arr[a].split('=');
      data[nA[0]] = nA[1];
    }
  }
  return data;
}