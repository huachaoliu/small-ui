import './index.less';
var map;
function mapInit() {
  map = new AMap.Map('root', {
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    zoom: 17,
    pitch: 75,
    rotation: -15,
    viewMode: '3D',//开启3D视图,默认为关闭
    buildingAnimation: false,//楼块出现是否带动画
    expandZoomRange: true,
    zooms: [3, 20],
    center: [121.476077, 31.226104]
  });

  // map.setMapStyle('amap://styles/macaron');

  const addMarker = () => {
    map.clearMap();
    let marker = new AMap.Marker({
      map,
      position: [121.476077, 31.226104],
    });
    // 设置鼠标划过点标记显示的文字提示
    // marker.setTitle('我是marker的title');
    //鼠标点击marker弹出自定义的信息窗体

    // 设置label标签
    marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
      offset: new AMap.Pixel(15, -15),//修改label相对于maker的位置
      content: "test"
    });

    AMap.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker.getPosition());
    });
  };

  addMarker();

  //实例化信息窗体
  const title = 'test';
  const content = [];
  content.push('<div class="project-img"><img src="http://tpc.googlesyndication.com/simgad/5843493769827749134"></div>');
  content.push("<a href='http://www.baidu.com'>进入项目</a>");

  const infoWindow = new AMap.InfoWindow({
    isCustom: true,  //使用自定义窗体
    content: createInfoWindow(title, content.join("")),
    offset: new AMap.Pixel(16, -45)
  });

  //关闭信息窗体
  function closeInfoWindow() {
    map.clearInfoWindow();
  }

  //构建自定义信息窗体
  function createInfoWindow(title, content) {
    let info = document.createElement("div");
    info.className = "info";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    let top = document.createElement("div");
    let titleD = document.createElement("div");
    let closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "http://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    let middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    let bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    let sharp = document.createElement("img");
    sharp.src = "http://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
  }

  map.addControl(new AMap.ControlBar({
    showZoomBar: false,
    showControlButton: true,
    position: {
      right: '10px',
      top: '10px'
    }
  }))
}

mapInit();