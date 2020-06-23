// 功能1：轮播图
// 要点1：自动播放
// 使用translate移动，添加过渡效果

// 要点2：播放到最后一张时，等动画结束后，再切换成第一张。注意：切换成第一张时去除过渡效果。

// 要点3：在过渡结束后设置小圆圈的样式
// 小圆圈样式使用过渡的动画：直接在css中设置transition

// 要点4：手指滑动轮播图
// 注意：手指滑动的时候要停止计时器
// 根据手指的滑动距离设置是否滑动到想要的模块

// 功能2：点击返回顶部

window.addEventListener('load', function() {
    var focus = document.querySelector('.focus')
    var ul = focus.querySelector('ul')
    var ol = focus.querySelector('ol')
    var focusWidth = focus.offsetWidth;
    var index = 0
    var time = setInterval(function() {
        index++;
        var move = -index * focusWidth;
        ul.style.transition = 'all .3s'
        ul.style.transform = `translateX(${move}px)`
    }, 2000)

    // 过渡结束后
    ul.addEventListener('transitionend', function() {
        // 播放到最后一张时，将其切换到第一张
        if (index >= 3) {
            index = 0;
            var move = -index * focusWidth;
            //清除过渡样式，使其直接切换
            ul.style.transition = "none"
            ul.style.transform = `translateX(${move}px)`
        } else if (index < 0) {
            index = 2;
            var move = -index * focusWidth;
            ul.style.transition = "none"
            ul.style.transform = `translateX(${move}px)`
        }


        // ♥ 去除带有样式的小圆圈，为当前索引的小圆圈添加样式
        ol.querySelector('.current').classList.remove('current')
        ol.children[index].classList.add('current')
    })

    // 手指滑动轮播图
    var fingerX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        // 手指初始的位置
        fingerX = e.targetTouches[0].pageX;
        // 清除轮播图的自动播放
        clearInterval(time)
    })
    ul.addEventListener('touchmove', function(e) {
        // 手指移动的距离
        moveX = e.targetTouches[0].pageX - fingerX;
        // ul滑动的距离=ul原来的位置+手指移动的距离
        var ulmove = -index * focusWidth + moveX;
        ul.style.transition = "none"
        ul.style.transform = `translateX(${ulmove}px)`

        // ❤ 防止手指在移动的过程中滚动屏幕，touchmove的默认操作就是滚动屏幕
        e.preventDefault()
    })

    // 手指移动的距离大于50px才滑动到下一个图片
    ul.addEventListener('touchend', function() {
        // 只有手指滑动了才进行判断
        if (moveX != 0) {
            if (Math.abs(moveX) >= 50) {
                // 根据moveX的正负判断是左滑还是右滑
                if (moveX > 0) {
                    index--
                } else if (moveX < 0) {
                    index++
                }
                // ul的位置=-index * focusWidth;
                var ulmove = -index * focusWidth;
                ul.style.transition = "all .3s"
                ul.style.transform = `translateX(${ulmove}px)`
            } else {
                // 手指移动的距离小于50px则回弹
                var ulmove = -index * focusWidth;
                ul.style.transition = "all .1s"
                ul.style.transform = `translateX(${ulmove}px)`
            }
        }

        // 手指松开后再次启动自动轮播
        // ❤ 开启之前先清除定时器，这样可以保证只有一个定时器在运行
        clearInterval(time)
        time = setInterval(function() {
            index++;
            var move = -index * focusWidth;
            ul.style.transition = 'all .3s'
            ul.style.transform = `translateX(${move}px)`
        }, 2000)

    })



    var nav = document.querySelector('nav')
    var goBack = document.querySelector('.goBack')
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = "block"
        } else {
            goBack.style.display = "none"
        }
    })
    goBack.addEventListener('click', function() {
        window.scroll(0, 0)
    })

})