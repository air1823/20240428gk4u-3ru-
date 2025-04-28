let video;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO); // 擷取攝影機影像
  video.size(windowWidth * 0.85, windowHeight * 0.85); // 設定影像大小為視窗的 85%
  video.hide(); // 隱藏原始的 HTML 元素

  // 建立與 video 尺寸相同的圖形緩衝區
  overlayGraphics = createGraphics(video.width, video.height);
  updateOverlayGraphics(); // 初始化覆蓋層內容
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

  // 確保 overlayGraphics 的大小與 video 一致
  if (overlayGraphics.width !== video.width || overlayGraphics.height !== video.height) {
    overlayGraphics = createGraphics(video.width, video.height);
    updateOverlayGraphics(); // 更新覆蓋層內容
  }

  // 在視訊上繪製 overlayGraphics（覆蓋在視訊上）
  image(overlayGraphics, x, y); // 與視訊位置相同
}

function updateOverlayGraphics() {
  overlayGraphics.clear(); // 清除之前的內容
  overlayGraphics.background(0); // 設定背景為黑色

  // 每隔 20 繪製一個圓，圓的顏色為灰階值
  for (let y = 0; y < overlayGraphics.height; y += 20) {
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      // 從 video 中取得相對應位置的顏色
      let col = video.get(x, y);
      let gray = (red(col) + green(col) + blue(col)) / 3; // 計算灰階值
      overlayGraphics.fill(gray); // 設定圓的顏色為灰階值
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓，置於單位中心
    }
  }
}
