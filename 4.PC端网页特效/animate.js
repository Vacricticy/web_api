function animate(element, target, callback) {
    clearInterval(element.move)
    element.move = setInterval(function() {
        var step = (target - element.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (element.offsetLeft === target) {
            clearInterval(element.move);
            callback && callback()
        }
        element.style.left = element.offsetLeft + step + 'px'
        console.log(element.style.left);
    }, 15)
}