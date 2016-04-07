/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityAdd = document.getElementById('aqi-city-input').value.trim();
	var numAdd = document.getElementById('aqi-value-input').value.trim();
	if (!cityAdd.match(/^[\u4e00-\u9fa5a-zA-z]+$/)) {
		alert("请输入正确的城市名称");
		return;
	} 	
	if (!numAdd.match(/^[0-9]+$/)) {
		alert("请输入正确的空气质量指数");
		return;
	} 	
	aqiData[cityAdd]=numAdd; 
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	
	var table=document.getElementById('aqi-table');
	var text = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var cityAdd in aqiData){
		
		text+="<tr><td>"+cityAdd+"</td><td>"+aqiData[cityAdd]+"</td><td><button>删除</button></td></tr>";

	}
	table.innerHTML = cityAdd ? text : "";	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById('aqi-table');
  table.addEventListener("click",function(e){
  	if (e.target && e.target.nodeName==="BUTTON") {
  		var city = e.target.parentElement.parentElement.firstChild.innerHTML;
  		delBtnHandle(city);
  	}
  })

}

init();