(function() {
	var that;
	function Game(map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}

	Game.prototype.start = function() {
		//1.把蛇和食物对象渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);

		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		//2.开始游戏逻辑
		//2.1让蛇移动起来
		//2.2当遇到边界，结束
		runSnake();
		//2.3通过键盘控制蛇移动方向
		bindKey();
		//2.4当遇到食物时，做相应处理
		
	}

	function bindKey() {
		// document.onKeydown = function() {}
		document.addEventListener('keydown',function(e) {
			//console.log(e.keyCode);
			//37 - left  38 - top  39 - right  40 - bottom
			switch (e.keyCode) {
				case 37:
					this.snake.direction = 'left';
					break;
				case 38:
					this.snake.direction = 'top';
					break;
				case 39:
					this.snake.direction = 'right';
					break;
				case 40:
					this.snake.direction = 'bottom';
					break;
			}
		}.bind(that),false);
	}
	//私有函数
	function runSnake() {
		var timerId = setInterval(function() {
			//让蛇走一个  在定时器的function中this是指向window对象的
			this.snake.move(this.food,this.map);
			this.snake.render(this.map);

			//2.2当蛇遇到边界游戏结束 
			//获取蛇头坐标
			var maxX = this.map.offsetWidth/this.snake.width;
			var maxY = this.map.offsetHeight/this.snake.height;
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			if(headX < 0 || headX >= maxX) {
				alert('Game Over');
				clearInterval(timerId);
			}
			if(headY < 0 || headY >= maxY) {
				alert('Game Over');
				clearInterval(timerId);
			}
		}.bind(that),150);
	}
	window.Game = Game;
})();

 