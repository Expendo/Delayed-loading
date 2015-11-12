


document.getElementsByClassName=function(oparent,oclass){
    try {
        return oparent.querySelectorAll("." + oclass);
    } catch (ex){
        var reset = [];
        var reg = new RegExp("\\b" + oclass + "\\b");
        var oCur = oparent.all;
        for (var i = 0; i < oCur.length; i++) {
            if (reg.test(oCur[i].className)) {
                reset.push(oCur[i]);
            }
        };
        return reset;
    }
}

window.onload = window.onresize = function(){
    //...获得第一个box的集合
    var obox = document.getElementsByClassName(document,"box")[0];
    //...
    margin = 0;
    //...获取所有li
    oli = obox.getElementsByTagName("li");
    //...图片盒子的宽
    liWidth = oli[0].offsetWidth+margin;
    function show(){
        //...页面总宽
        var bodyWidth = document.body.offsetWidth;
        //...
        var columnHeight = [];
        /* olight=oli.length; */
        n = parseInt(bodyWidth/liWidth);//...决定一行多少个img
        var columnNum = n == 0?1:n;//...最少一个
        //console.log('columnNum',columnNum)
        //...余下的宽度
        var bodyLeft = bodyWidth >= liWidth ? bodyWidth-columnNum*liWidth : 0;
        //...居中
        obox.style.left = parseInt(bodyLeft/2)-(margin/2)+"px";
        //...算法
        //...循环打印出来,li结构
        var j = 0;
        for (var i = 0; i < oli.length; i++) {
            //...i与一行个数 4
            if(i < columnNum){
                columnHeight[i]=oli[i].offsetHeight+margin;//...装下4个的高度
                oli[i].style.left=i*liWidth+"px";
                oli[i].style.top=0;
            }else{
                //console.log('',i);
                //console.log('j',j);
                //console.log(columnHeight);
                //...j与图片个数比较  4
                if(j >= columnHeight.length){
                    j=0;
                }
                //...读取高度
                var imgheight=oli[i].offsetHeight+margin;
                oli[i].style.left=j*liWidth+"px";
                oli[i].style.top=columnHeight[j]+"px";
                columnHeight[j]+=imgheight;//...填充4个
                j++;
                //console.log(j+"J"+oli[i].offsetTop+"和"+ j*liWidth+"I"+i)
            }


        }

    }
    var k = 0;
    function runing(){
        //...滚动条的top
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        //...获取可见高度
        winH=document.documentElement.clientHeight;

        //...算法 30
        for (var i = 0; i < oli.length; i++) {
            //...当前对象高度的三分之一
            var oliheight=oli[i].offsetHeight/3;
            //...top
            var liTop = (oli[i].getBoundingClientRect().top);
            //...li的高度 大于 滚动条的高度,
            console.log(liTop,scrollTop)
            //...滚动条的高度+可见高度,大于,li的top+三分之一,向下
            //...li的高度,大于,滚动条的高度,向上
            if( winH > liTop+oliheight && liTop >= 0 ){
                oli[i].style.opacity=1;
            }
        };
    }



    show();
    runing();
    window.onscroll=function(){
        runing();
    }
}