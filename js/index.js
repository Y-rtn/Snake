// ------------Tools------------
// ;(function() {
// 	var Tools = {
// 		getRandom: function (min,max) {
// 			return Math.floor(Math.random()*(max-min+1))+min;
// 		}
//     }
//     window.Tools = Tools;
// })()

// -------------food---------------
// //自调用函数---开启新的作用域，避免命名冲突
// ;(function() {
// 	var position = 'absolute';
// 	//记忆上次的食物，为删除做准备
// 	var elements = [];
// 	function Food(options) {
// 		options = options || {};
// 		this.x = options.x || 0;
// 		this.y = options.y || 0;

// 		this.width = options.width || 20;
// 		this.height = options.height || 20;

// 		this.color = options.color || 'green';
// 	}

// 	//渲染
// 	Food.prototype.render = function(map) {
// 		//删除之前的食物
// 		remove();
// 		//随机设置x和y的值
// 		this.x = Tools.getRandom(0,map.offsetWidth/this.width - 1) * this.width;
// 		this.y = Tools.getRandom(0,map.offsetHeight/this.height - 1) * this.height;
// 		//动态创建div,页面上的食物
// 		var div = document.createElement('div');
// 		map.appendChild(div);

// 		elements.push(div);
// 		//设置div样式
// 		div.style.position = position;
// 		div.style.left = this.x +'px';
// 		div.style.top = this.y +'px';
// 		div.style.width = this.width + 'px';
// 		div.style.height = this.height + 'px';
// 		div.style.backgroundColor = this.color;
// 	}

// 	function remove() {
// 		for (var i = elements.length - 1; i>=0; i--) {
// 			//删除div
// 			elements[i].parentNode.removeChild(elements[i]);
// 			//删除数组中的元素
// 			elements.splice(i,1);
// 		}
// 	}
// 	//把Food构造函数 让外部可以访问
// 	window.Food = Food;
// })()

// -------------snake-----------------
// //自调用函数
// ;(function() {

// 	var position = 'absolute';
// 	//记录之前创建的蛇
// 	var elements = [];
// 	function Snake(options) {
// 		options = options || {};
// 		this.width = options.width || 20;
// 		this.height = options.height || 20;
// 		//蛇移动的方向
// 		this.direction = options.direction || 'right';
// 		//蛇的身体（蛇节）
// 		this.body = [
// 			{x: 3,y: 2,color: 'red'},
// 			{x: 2,y: 2,color: 'blue'},
// 			{x: 1,y: 2,color: 'blue'},
// 		];
// 	}

// 	Snake.prototype.render = function(map) {
// 		//删除之前创建的蛇
// 		remove();
// 		//把每一个蛇节渲染到地图上
// 		for(var i = 0, len = this.body.length; i < len; i++) {
// 			var object = this.body[i];
// 			//
// 			var div = document.createElement('div');
// 			map.appendChild(div);
// 			//记录当前蛇
// 			elements.push(div);
// 			//设置样式
// 			div.style.position = position;
// 			div.style.width = this.width + 'px';
// 			div.style.height = this.height + 'px';
// 			div.style.left = object.x*this.width + 'px';
// 			div.style.top = object.y*this.height + 'px';
// 			div.style.backgroundColor = object.color;
// 		}
// 	}
// 	//私有的成员
// 	function remove() {
// 		for(var i = elements.length - 1; i >= 0; i--) {
// 			//删除div
// 			elements[i].parentNode.removeChild(elements[i]);
// 			//删除数组中的元素
// 			elements.splice(i,1);
// 		}
// 	}
// 	//控制蛇移动
// 	Snake.prototype.move = function(food,map) {
// 		//控制蛇的身体移动，当前蛇节到上一个蛇节位置
// 		for(var i = this.body.length - 1; i > 0; i--) {
// 			this.body[i].x = this.body[i - 1].x;
// 			this.body[i].y = this.body[i - 1].y;
// 		}
// 		//控制蛇头移动
// 		var head = this.body[0];
// 		switch(this.direction) {
// 			case 'right': 
// 				head.x +=1;
// 				break;
// 			case 'left':
// 				head.x -=1;
// 				break;
// 			case 'top':
// 				head.y -=1;
// 				break;
// 			case 'bottom':
// 				head.y +=1;
// 				break;
// 		}
// 		//判断蛇是否和食物的坐标重合
// 		var headX = head.x*this.width;
// 		var headY = head.y*this.height;
// 		if(headX === food.x && headY === food.y) {
// 			//让蛇增加一节
// 			//获得蛇的最后一节
// 			var last = this.body[this.body.length - 1];
// 			this.body.push({
// 				x: last.x,
// 				y: last.y,
// 				color: last.color
// 			})
// 			//随机在地图上生成食物
// 			food.render(map);
// 		}
// 	}
// 	window.Snake = Snake;
// })()

// ----------------Game--------------
// ;(function() {
// 	var that;
// 	function Game(map) {
// 		this.food = new Food();
// 		this.snake = new Snake();
// 		this.map = map;
// 		that = this;
// 	}

// 	Game.prototype.start = function() {
// 		//1.把蛇和食物对象渲染到地图上
// 		this.food.render(this.map);
// 		this.snake.render(this.map);

// 		// this.snake.move();
// 		// this.snake.render(this.map);
// 		// this.snake.move();
// 		// this.snake.render(this.map);
// 		// this.snake.move();
// 		// this.snake.render(this.map);
// 		//2.开始游戏逻辑
// 		//2.1让蛇移动起来
// 		//2.2当遇到边界，结束
// 		runSnake();
// 		//2.3通过键盘控制蛇移动方向
// 		bindKey();
// 		//2.4当遇到食物时，做相应处理
		
// 	}

// 	function bindKey() {
// 		// document.onKeydown = function() {}
// 		document.addEventListener('keydown',function(e) {
// 			//console.log(e.keyCode);
// 			//37 - left  38 - top  39 - right  40 - bottom
// 			switch (e.keyCode) {
// 				case 37:
// 					this.snake.direction = 'left';
// 					break;
// 				case 38:
// 					this.snake.direction = 'top';
// 					break;
// 				case 39:
// 					this.snake.direction = 'right';
// 					break;
// 				case 40:
// 					this.snake.direction = 'bottom';
// 					break;
// 			}
// 		}.bind(that),false);
// 	}
// 	//私有函数
// 	function runSnake() {
// 		var timerId = setInterval(function() {
// 			//让蛇走一个  在定时器的function中this是指向window对象的
// 			this.snake.move(this.food,this.map);
// 			this.snake.render(this.map);

// 			//2.2当蛇遇到边界游戏结束 
// 			//获取蛇头坐标
// 			var maxX = this.map.offsetWidth/this.snake.width;
// 			var maxY = this.map.offsetHeight/this.snake.height;
// 			var headX = this.snake.body[0].x;
// 			var headY = this.snake.body[0].y;
// 			if(headX < 0 || headX >= maxX) {
// 				alert('Game Over');
// 				clearInterval(timerId);
// 			}
// 			if(headY < 0 || headY >= maxY) {
// 				alert('Game Over');
// 				clearInterval(timerId);
// 			}
// 		}.bind(that),150);
// 	}
// 	window.Game = Game;
// })();

// -----------------调用----------------------
// ;(function() {
// 	var map = document.getElementById('map');
// 	var game = new Game(map);
// 	game.start();
// })()
