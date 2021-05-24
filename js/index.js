/***
 * 
 * 分析：
 * 
 *  一， 自身的动画  +  移动的动画
 * 
 *  1， 自身动画如何实现？ 
 *  2， 移动的动画如何实现？
 *  
 *    
 * 
 *  二，  多只小羊奔跑
 *   
 *   1，如何实现多个小羊 奔跑
 *   2，一只一只的出现
 *   3，舞台上 最多只能存在n只 （设定范围）
 *   4， 速度有快又慢
 *    
 * 
 *  三， 拖拽的效果 ，松开鼠标继续奔跑（作用域整个舞台）
 *   
 *   1. 如何实现拖拽 
 *   2，拖拽的时候，小羊“瑟瑟发抖”
 *   3，小羊松开鼠标，（任意位置）继续奔跑
 * 
 * 单对象 进行编程
 */
//自身的动画
// var sheep = document.getElementsByClassName('sheep')[0];
// var speed = 10;
// var backNum = 0;
// var ainimate = setInterval(function(){
//     backNum = backNum + 164;
//     if(backNum == 1312){
//         backNum = 0;
//     }
//     sheep.style.backgroundPosition = -backNum + "px " + 0 + "px";
//     var cot = sheep.offsetLeft - speed;
//     sheep.style.left = cot + 'px';

// },100)
//移动的动画 

// function a(x){
//     console.log(x)
// }
// a(123);
//  小羊奔跑案例

var sheep = {

    sPars: {
        stage: document.getElementsByClassName('stage')[0],
        speed: 7,
        backNum: 0,
        frequency: 70,
        maxSheeps:8
    },

    init: function () {

        this.creatSheep();//创建小羊的函数、方法
    },
    creatSheep: function () {

        function SheepClass(data) {//构造函数
            this.sheep = document.createElement('div');
            data.stage.appendChild(this.sheep);
            this.sheep.className = 'sheep';
            this.frequency = Math.floor(Math.random() * data.frequency) + 30;
            this.backNum = data.backNum;
            this.speed = data.speed;
            this.stage = data.stage;

            this.top = 0;
            this.currentSpeed = data.speed;

        }

    var _this = this;
        var timer = setInterval(function(){// 让羊一只一只出现
            var sheepNum = _this.sPars.stage.children.length;//舞台上羊的个数
            if(sheepNum < _this.sPars.maxSheeps){
                var oneSheep = new SheepClass(_this.sPars);
                _this.sheepRun(oneSheep);//小羊的奔跑
            }
           
        },1000)

       

    },
    sheepRun:function(sheepPlus){//小羊奔跑动画

        sheepPlus.ainimate = setInterval(function(){
            sheepPlus.backNum = sheepPlus.backNum + 164;
                if(sheepPlus.backNum == 1312){
                    sheepPlus.backNum = 0;
                }
                sheepPlus.sheep.style.backgroundPosition = -sheepPlus.backNum + "px " + sheepPlus.top + "px";
                var cot = sheepPlus.sheep.offsetLeft - sheepPlus.speed;
                if(cot<= -164){
                    clearInterval(sheepPlus.ainimate);
                    sheepPlus.stage.removeChild(sheepPlus.sheep);
                    console.log('remove')
                }
                sheepPlus.sheep.style.left = cot + 'px';
            
            },sheepPlus.frequency)

            //拖拽
            sheepPlus.sheep.onmousedown = function(e){

                sheepPlus.speed = 0;
                sheepPlus.top = -128;


                sheepPlus.x = e.pageX;//鼠标按下的x 和 y
                sheepPlus.y = e.pageY;


                document.onmousemove = function(e){
                    var chax = e.pageX - sheepPlus.x;
                    var chay = e.pageY - sheepPlus.y;
                    sheepPlus.sheep.style.left = sheepPlus.sheep.offsetLeft + chax + 'px';
                    sheepPlus.sheep.style.top = sheepPlus.sheep.offsetTop + chay + 'px';
                    sheepPlus.x = e.pageX;//鼠标按下的x 和 y
                    sheepPlus.y = e.pageY;
                    

                }


                document.onmouseup = function(e){
                    document.onmousemove = null;
                    sheepPlus.speed = sheepPlus.currentSpeed;
                    sheepPlus.top = 0;
                }





            }



    }
}
sheep.init();