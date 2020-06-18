window.addEventListener("load", function() {
    var preview = document.querySelector(".preview_img");
    var mask = document.querySelector(".mask");
    var big = document.querySelector(".big");

    // 步骤一：移入则显示放大镜，移出则隐藏
    preview.addEventListener("mouseover", function() {
        mask.style.display = "block";
        big.style.display = "block";
    });
    preview.addEventListener("mouseout", function() {
        mask.style.display = "none";
        big.style.display = "none";
    });

    // 步骤二：遮罩框的中心跟着鼠标移动
    // 注意：这里是mousemove,不是mouseover
    preview.addEventListener("mousemove", function(e) {
        // 拿到鼠标在盒子中的距离
        // 注意：offsetLeft获取是相对于带有定位的父元素的偏移量，此时需要确定一下该元素的父元素是否带有定位。
        // 因为此处想要获取的是相对于body的偏移量，所有需要注意一下
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;


        // 初始鼠标是与遮罩框的左上角重合的，为了与其中心重合，需要向左和向上移动盒子一半的距离
        var maskMoveX = x - mask.offsetWidth / 2
        var maskMoveY = y - mask.offsetHeight / 2;
        // 遮挡层的最大移动距离
        maskMaxX = preview.offsetWidth - mask.offsetWidth
        maskMaxY = preview.offsetHeight - mask.offsetHeight

        // 步骤三：控制遮罩层在盒子的内部
        // 如果小于0，则固定偏移距离为0
        if (maskMoveX <= 0) {
            maskMoveX = 0;
            // 如果大于了遮罩层最大的移动距离，则把偏移距离固定为最大距离
        } else if (maskMoveX >= maskMaxX) {
            maskMoveX = maskMaxX
        }
        if (maskMoveY <= 0) {
            maskMoveY = 0
        } else if (maskMoveY >= maskMaxY) {
            maskMoveY = maskMaxY
        }
        mask.style.left = maskMoveX + 'px';
        mask.style.top = maskMoveY + 'px';


        // 步骤四：大图片的移动跟随遮罩层的移动。

        //公式： 遮挡层移动的距离/遮挡层最大的移动距离=大图片移动的距离/大图片最大的移动距离
        var bigImage = document.querySelector('.bigImg');
        // 计算大图片的最大移动距离
        var bigMaxX = bigImage.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImage.offsetHeight - big.offsetHeight;
        // 根据公式计算大图片的移动距离
        var bigMoveX = maskMoveX / maskMaxX * bigMaxX;
        var bigMoveY = maskMoveY / maskMaxY * bigMaxY;
        // console.log(bigMoveX, bigMoveY);
        // ❤ 注意：遮罩层移动的方向与大图移动的方向是相反的，所有前面应该加一个-号
        bigImage.style.left = -bigMoveX + 'px';
        bigImage.style.top = -bigMoveY + 'px'
    });
});