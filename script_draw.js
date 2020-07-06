// отрисовка фона
function draw() {
  var canvas = document.getElementById('myCanvas');
  var content = canvas.getContext('2d');
  var gradient = content.createLinearGradient(0, 744.42, 206.954, 0);

  gradient.addColorStop(0, 'rgb(255,143,90)');
  gradient.addColorStop(1, 'rgb(255,47,150)');

  content.beginPath();
  content.moveTo(395.520, 40.407);
  content.bezierCurveTo(502.261, -10.049, 602.994, -10.204, 687.212, 27.671);
  content.bezierCurveTo(771.647, 65.238, 839.568, 140.836, 885.703, 234.785);
  content.bezierCurveTo(929.973, 329.669, 929.926, 431.584, 893.771, 514.027);
  content.bezierCurveTo(857.115, 597.700, 796.105, 660.782, 712.966, 705.804);
  content.bezierCurveTo(668.936, 728.473, 622.654, 744.002, 563.818, 753.535);
  content.bezierCurveTo(505.757, 762.929, 435.142, 766.325, 360.325, 761.479);
  content.bezierCurveTo(211.851, 752.158, 45.449, 708.398, 10.358, 609.690);
  content.bezierCurveTo(-9.529, 560.677, 2.954, 504.492, 27.679, 447.950);
  content.bezierCurveTo(52.809, 391.326, 90.181, 334.346, 129.419, 281.835);
  content.bezierCurveTo(169.063, 229.242, 210.573, 181.118, 253.309, 140.306);
  content.bezierCurveTo(296.450, 99.410, 340.817, 65.827, 395.520, 40.407);
  content.lineTo(395.520, 40.407);

  content.fillStyle = gradient;
  content.fill();
};

document.addEventListener("DOMContentLoaded", draw);
