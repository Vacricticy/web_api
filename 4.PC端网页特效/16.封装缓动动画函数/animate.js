function animate(element, target, callback) {
    clearInterval(element.move)
    element.move = setInterval(function() {
        // 移动的距离通过公式求得，逐渐减少
        // ❤ 问题1：step为小数时，位数的问题可能会导致移动的步长不准确。
        // 解决：转化为整数处理,且必须向上取整
        var step = (target - element.offsetLeft) / 10
        console.log(`target:${target} offsetLeft:${element.offsetLeft}  step:${step}`);
        // 若移动方向为正，则step>0,应该向上取整；若移动方向为负，则step<0,应该向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 注意： 这里为了使元素能够原路返回， 必须使用 === ，而不能使用 >=
        if (element.offsetLeft === target) {
            clearInterval(element.move);
            // ❤回调函数的作用：可以在动画结束后，进行任何想要的操作，比如：移动结束后箭头方向的改变
            callback && callback()
        }
        element.style.left = element.offsetLeft + step + 'px'
        console.log(element.style.left);
    }, 15)
}