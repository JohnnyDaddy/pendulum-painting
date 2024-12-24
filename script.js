const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let radiusX = 420; // X축 반지름
let radiusY = 200; // Y축 반지름
let shrinkRate = 0.015; // 반지름 감소율
const twistAngle = 0.06; // 한 바퀴 돌 때마다 비틀 각도
const shrinkAcceleration = 0.000002; // 반지름 감소율 가속도
const strokeColor = 'white'; // 선 색상
const minimumRadiusX = 10; // X축 최소 반지름
const minimumRadiusY = 10; // Y축 최소 반지름


const ball = {
    angle: 0, // 초기 각도
    angularVelocity: 0.05 // 각속도
};

let prevX = centerX + radiusX * Math.cos(ball.angle); // 이전 X 좌표
let prevY = centerY + radiusY * Math.sin(ball.angle); // 이전 Y 좌표
let currentTwist = 0; // 현재 비틀어진 각도

function update() {
    // 각도 업데이트
    ball.angle += ball.angularVelocity;

    // 타원의 각도를 조금씩 비틂
    currentTwist += twistAngle / (2 * Math.PI / ball.angularVelocity);

    // 반지름 감소율 가속도 적용    
    shrinkRate += shrinkAcceleration;

    // 반지름 감소
    radiusX -= shrinkRate;
    radiusY -= shrinkRate;
    if (radiusX < minimumRadiusX) {
        radiusX = minimumRadiusX;
    }
    if (radiusY < minimumRadiusY) {
        radiusY = minimumRadiusY;
    }

    // 타원의 각도를 기울여서 계산
    const x = centerX + radiusX * Math.cos(ball.angle) * Math.cos(currentTwist) - radiusY * Math.sin(ball.angle) * Math.sin(currentTwist); // 현재 X 좌표 계산
    const y = centerY + radiusX * Math.cos(ball.angle) * Math.sin(currentTwist) + radiusY * Math.sin(ball.angle) * Math.cos(currentTwist); // 현재 Y 좌표 계산

    // 이전 점과 현재 점을 연결하는 선 그리기
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // 현재 점을 이전 점으로 업데이트
    prevX = x;
    prevY = y;

    requestAnimationFrame(update);
}

update();

document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'pendulum.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
});