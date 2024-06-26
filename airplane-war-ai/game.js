// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// 玩家飞机的属性
const player = {
    x: canvasWidth / 2 - 25,  // 水平居中
    y: canvasHeight - 100,    // 距离底部100像素
    width: 50,
    height: 50,
    speed: 5,
    isMoving: false
};

// 敌人数组
const enemies = [];

// 创建敌人
function createEnemy() {
    const size = Math.random() * 50 + 20;  // 随机大小
    const x = Math.random() * (canvasWidth - size);  // 随机水平位置
    const y = -size;  // 从画布顶部出现
    const speed = Math.random() * 2 + 1;  // 随机速度
    enemies.push({ x, y, size, speed });
}

// 更新敌人位置
function updateEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > canvasHeight) {
            enemies.splice(index, 1);  // 超出画布底部，移除敌人
        }
    });
}

// 绘制敌人
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });
}

// 碰撞检测
function checkCollisions() {
    enemies.forEach((enemy, index) => {
        if (player.x < enemy.x + enemy.size &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.height > enemy.y) {
            // 检测到碰撞，游戏结束
            alert('Game Over!');
            document.location.reload();
        }
    });
}

// 游戏更新函数
function update() {
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 绘制玩家
    drawPlayer();

    // 更新和绘制敌人
    updateEnemies();
    drawEnemies();

    // 检测碰撞
    checkCollisions();

    // 请求下一帧
    requestAnimationFrame(update);
}

// 绘制玩家
function drawPlayer() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 设置定时器定期创建敌人
setInterval(createEnemy, 1000);

// 初始化游戏
update();

// 窗口尺寸改变时更新画布尺寸
window.addEventListener('resize', () => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    player.x = canvasWidth / 2 - player.width / 2;
    player.y = canvasHeight - 100;
});

// 处理鼠标移动事件
canvas.addEventListener('mousemove', (e) => {
    player.x = e.clientX - player.width / 2;
    player.y = e.clientY - player.height / 2;
});

// 处理触摸移动事件
canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    player.x = touch.clientX - player.width / 2;
    player.y = touch.clientY - player.height / 2;
    e.preventDefault();  // 防止滚动
});
