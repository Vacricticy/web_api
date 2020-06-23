// 要点1：移入轮播图，显示左右按钮，并暂停自动播放。移出则隐藏，并开启自动轮播。
// 要点2：点击按钮，左右翻动轮播图，且小圆圈样式对应改变
// 要点3：移入小圆圈，轮播图片
// 要点4：通过节流阀实现 前一次轮播动画执行完后才能再次轮播动画
// 要点5：无缝滚动的实现：
// 在最后的位置添加第一张的图片，使其成为‘最后一张图片’。
// 当向右滚动到‘最后一张图片’时，将显示的位置设置为实际的第一张图片。
// 当向左滚动到‘第一张图片’时，将显示的位置设置为实际的最后一张图片。

// ❤ 核心算法：ul移动的距离等于索引号乘以图片的宽度

// 节流阀原理：
// 在执行之前，先判断flag的值，满足条件则立即修改flag的值，防止本次动画结束前再次被调用。
// 执行完毕后，在回调函数中修改flag的值，使其可以再次被调用。
// ♥ 其实质相当于同步锁的概念，A一执行则立即将锁拿住，执行结束后再放锁。


// ♥ 自动播放的实现：在定时器中调用右击函数


window.addEventListener('load', function() {
    // 移入轮播图，显示左右按钮。移出则隐藏。
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    var focus = document.querySelector('.focus')
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = "block"
        arrow_r.style.display = "block";
        // 鼠标移入的使用停止自动播放
        clearInterval(time)
        time = null
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = "none"
        arrow_r.style.display = "none";
        // 鼠标移除的时候继续自动播放
        time = setInterval(function() {
            arrow_r.click()
        }, 2000)
    })

    // 要点2：动态生成小圆圈的个数，使其与图片的个数相同
    var ul = focus.querySelector('ul')
    var length = ul.children.length
    var ol = focus.querySelector('ol')
    var pictureWidth = focus.offsetWidth

    var num = 0 //当前显示的图片的索引
    var cicle = 0; //高亮的小圆圈索引

    for (var i = 0; i < length; i++) {
        var li = document.createElement('li');
        // 设置自定义属性，方便后续移入小圆圈获取索引值
        li.setAttribute('data-index', i);
        // 为小圆圈绑定移入事件
        li.addEventListener('mouseenter', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ""
            }
            this.className = "current"
            var index = this.dataset.index;
            // 核心算法：ul移动的距离等于小圆圈的索引号乘以图片的宽度
            animate(ul, -index * pictureWidth);
            // 当鼠标移入小圆圈后，将索引值赋值给num，方便点击->按钮时正确显示
            num = index;
            // 同上，为了让小圆圈的索引值与之对应，应该将index赋值给cicle
            cicle = index;
            console.log(num);
        })
        ol.appendChild(li)
    }
    ol.children[0].className = "current"


    // 自动创建最后的图片，否则小圆圈会多一个
    var lastLi = ul.children[0].cloneNode(true)
    ul.appendChild(lastLi)

    // 要点3：点击→按钮，切换下一张
    var flag = true
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // ❤ 无缝切换的实现：
            // 在html文件中为图片的后面再添加一张第一张的图片
            // 当显示出最后添加的图片后，将ul的left设置为0，即恢复成初始状态，便实现了无缝切换
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++
            console.log(num);
            animate(ul, -num * pictureWidth, function() {
                // 动画执行完后，将flag设置为true,此时点击->按钮才可以继续切换下一张图片
                flag = true
            })

            // 点击按钮切换时控制小圆圈的样式
            cicle++
            // 自加后判断是否已经到达‘最后一张’，是的话重置为0，即回到实际的第一张
            if (cicle == ol.children.length) {
                cicle = 0
            }
            cicleChange()
        }
    })


    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // ❤ 无缝切换的实现：
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * pictureWidth + 'px';
            }
            num--
            console.log(num);
            animate(ul, -num * pictureWidth, function() {
                flag = true
            })

            // 点击按钮切换时控制小圆圈的样式
            cicle--
            if (cicle < 0) {
                cicle = ol.children.length - 1
            }
            cicleChange()
        }

    })

    function cicleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ""
        }
        ol.children[cicle].className = "current"
    }

    // 实现自动轮播播放图片的原理:设置定时器,手动调用->点击事件
    var time = setInterval(function() {
        arrow_r.click()
    }, 2000)
})