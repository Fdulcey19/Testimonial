(function ($) {
    // 本函数每次调用只负责一个轮播图的功能
    // 也就是说只会产生一个轮播图，这个函数的作用域只能分配给一个轮播图
    // 要求在调用本函数的时候务必把当前轮播图的根标签传递过来
    // 这里的形参 ele 就是某个轮播的根标签
    var slide = function (ele, options) {
        var $ele = $(ele);
        // 默认设置选项
        var setting = {
            // 控制轮播的动画时间
            speed: 2000,
            // 控制 interval 的时间 (轮播速度)
            interval: 4000,

        };
        // 对象合并
        $.extend(true, setting, options);
        // 规定好每张图片处于的位置和状态
        var mediaQuery = window.matchMedia("(max-width: 300px)");
        if (mediaQuery.matches) {
            // pantalla menor a 400 px de ancho
            states = [
                { $zIndex: 1, width: 70, height: 60, top: 15, left: 15, $opacity: 0.01 },
                { $zIndex: 2, width: 70, height: 60, top: 15, left: 15, $opacity: 0.1 },
                { $zIndex: 3, width: 70, height: 60, top: 15, left: 15, $opacity: 0.7, },
                { $zIndex: 4, width: 85, height: 85, top: 0, left: 80, $opacity: 1 },
                { $zIndex: 3, width: 70, height: 60, top: 15, left: 160, $opacity: 0.7 },
                { $zIndex: 2, width: 70, height: 60, top: 15, left: 160, $opacity: 0.01 },
            ];
        }
        else {
            var mediaQuery = window.matchMedia("(max-width: 400px)");
            if (mediaQuery.matches) {
                // pantalla menor a 400 px de ancho
                states = [
                    { $zIndex: 1, width: 40, height: 30, top: 19, left: 45, $opacity: 0.2 },
                    { $zIndex: 2, width: 50, height: 40, top: 19, left: 45, $opacity: 0.4 },
                    { $zIndex: 3, width: 70, height: 60, top: 5, left: 90, $opacity: 0.7, },
                    { $zIndex: 4, width: 80, height: 80, top: 0, left: 150, $opacity: 1 },
                    { $zIndex: 3, width: 70, height: 60, top: 5, left: 220, $opacity: 0.7 },
                    { $zIndex: 1, width: 50, height: 30, top: 19, left: 280, $opacity: 0.2 }
                ];
            } else {
                var mediaQuery = window.matchMedia("(max-width: 768px)");
                if (mediaQuery.matches) {
                    // pantalla entre 400 y 768 px de ancho
                    states = [
                        { $zIndex: 1, width: 80, height: 90, top: 49, left: 120, $opacity: 0.2 },
                        { $zIndex: 2, width: 90, height: 100, top: 49, left: 120, $opacity: 0.4 },
                        { $zIndex: 3, width: 120, height: 140, top: 15, left: 200, $opacity: 0.7, },
                        { $zIndex: 4, width: 160, height: 160, top: 0, left: 310, $opacity: 1 },
                        { $zIndex: 3, width: 120, height: 140, top: 15, left: 460, $opacity: 0.7 },
                        { $zIndex: 1, width: 90, height: 90, top: 49, left: 570, $opacity: 0.2 }
                    ];
                } else {
                    // pantalla grande
                    states = [
                        { $zIndex: 1, width: 120, height: 130, top: 69, left: 134, $opacity: 0.2 },
                        { $zIndex: 2, width: 130, height: 140, top: 69, left: 0, $opacity: 0.4 },
                        { $zIndex: 3, width: 170, height: 180, top: 35, left: 110, $opacity: 0.7, },
                        { $zIndex: 4, width: 240, height: 240, top: 0, left: 263, $opacity: 1 },
                        { $zIndex: 3, width: 170, height: 180, top: 35, left: 470, $opacity: 0.7 },
                        { $zIndex: 1, width: 130, height: 130, top: 69, left: 620, $opacity: 0.2 }
                    ];
                }
            }
        }




        var $lis = $ele.find('li');
        var timer = null;

        // 事件
        $ele.find('.hi-next').on('click', function () {
            next();
        });
        $ele.find('.hi-prev').on('click', function () {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function () {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function () {
            autoPlay();
        });

        move();
        autoPlay();

        // 让每个 li 对应上面 states 的每个状态
        // 让 li 从正中间展开
        function move() {
            $lis.each(function (index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        // 切换到下一张
        function next() {
            // 原理：把数组最后一个元素移到第一个
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    // 找到要轮播的轮播图的根标签，调用 slide()
    $.fn.hiSlide = function (options) {
        $(this).each(function (index, ele) {
            slide(ele, options);
        });
        // 返回值，以便支持链式调用
        return this;
    }
})(jQuery); 