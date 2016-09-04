
    define(function(require,exports,module){

        //用来依赖其他js文件
        var Bird=require('./bird');
        var Pipe=require('./pipe');
        var Land=require('./land');
        var Sky=require('./sky');
        
        
    
      

    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    function main(imgObjects) {
        // console.log('全部加载完成,已加载：', loadCount);

        // 游戏结束的标记
        var gameover = false;

        // 创建了显示对象
        var bird = new Bird(imgObjects[0], cvs,ctx);
        var sky1 = new Sky(imgObjects[4], 0,ctx);
        var sky2 = new Sky(imgObjects[4], 800,ctx);
        var pipe1 = new Pipe(imgObjects[2], imgObjects[3], 800,ctx);
        var pipe2 = new Pipe(imgObjects[2], imgObjects[3], 1000,ctx);
        var pipe3 = new Pipe(imgObjects[2], imgObjects[3], 1200,ctx);
        var pipe4 = new Pipe(imgObjects[2], imgObjects[3], 1400,ctx);
        var pipe5 = new Pipe(imgObjects[2], imgObjects[3], 1600,ctx);
        var land1 = new Land(imgObjects[1], 0,ctx);
        var land2 = new Land(imgObjects[1], 336,ctx);
        var land3 = new Land(imgObjects[1], 336 * 2,ctx);
        var land4 = new Land(imgObjects[1], 336 * 3,ctx);

         // 程序的主循环
        var lastTime = Date.now();
        function loop() {
            // 拿到间隔时间
            var now = Date.now();
            var dt = now - lastTime;
            // 这是为了下一帧做准备
            lastTime = now;

            // 清空屏幕
            ctx.clearRect(0, 0, 800, 600);

            // 更新数据、绘制对象
            sky1.update(dt);
            sky2.update(dt);
            pipe1.update(dt);
            pipe2.update(dt);
            pipe3.update(dt);
            pipe4.update(dt);
            pipe5.update(dt);
            land1.update(dt);
            land2.update(dt);
            land3.update(dt);
            land4.update(dt);
            bird.update(dt);

            // 判断是否进入了特殊状态（游戏结束）

            // 1.撞天花板或者地面
            if (bird.y < 0 || bird.y > 600 - 112) {
                gameover = true;
            }

            // 2.撞管子
            if(ctx.isPointInPath(bird.x,bird.y)){
                gameover = true;
            }
            // 清除这一帧已经绘制过的路径
            ctx.beginPath();

            // 绘制所有的displayObject
            sky1.draw();
            sky2.draw();
            pipe1.draw();
            pipe2.draw();
            pipe3.draw();
            pipe4.draw();
            pipe5.draw();
            land1.draw();
            land2.draw();
            land3.draw();
            land4.draw();
            bird.draw();

            // 递归再次调用自身
            if (!gameover) {
                requestAnimationFrame(loop);
            }
        }

        loop();

    }

module.exports=main;//将main函数曝露在外边

    })
    
    
   
