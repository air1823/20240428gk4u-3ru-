let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO); // 擷取攝影機影像
  video.size(windowWidth * 0.85, windowHeight * 0.85); // 設定影像大小為視窗的 85%
  video.hide(); // 隱藏原始的 HTML 元素
}

function draw() {
  background("#ffffb7"); // 設定背景顏色為淺黃色
  // 計算影像的顯示位置，使其置中
  let x = (width - video.width) / 2;
  let y = (height - video.height) / 2;

  // 翻轉畫布以水平翻轉影像
  push();
  translate(width, 0); // 將原點移到畫布右上角
  scale(-1, 1); // 水平翻轉畫布
  image(video, x, y); // 在畫布上繪製攝影機影像
  pop();
}
