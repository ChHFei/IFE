/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var cityslct = document.getElementById('city-select');

var gratime = document.getElementById('form-gra-time');
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var color='';
  var text='';
  for(var item in chartData){
   
    color='rgb('+parseInt(256*Math.random())+','+parseInt(256*Math.random())+','+parseInt(256*Math.random())+')';
    text+='<div class="chat-piece" onmouseover="see(this)" onmouseout="usee(this)" style="height:'+chartData[item]+'px;background-color:'+color+'">'
    +'<span class="tip">data:'+item+'<br/>'+'num:'+chartData[item]+'</span></div>';

  }
  document.getElementById('aqi-chart-wrap').innerHTML=text;


}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据
  var timeipt = document.getElementsByTagName('input');
  

  for (var i = 0; i < timeipt.length; i++) {
    
    
    if (timeipt[i].checked && timeipt[i].value!=pageState.nowGraTime) {
      
      pageState.nowGraTime=timeipt[i].value;

    }
  }
  // 调用图表渲染函数
  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  
  // 调用图表渲染函数
  initAqiChartData();

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  // var gratime = document.getElementById('form-gra-time');
  gratime.onclick=graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var text='';
  // var cityslct = document.getElementById('city-select');
  for(var item in aqiSourceData){
    text+='<option>'+item+'</option>';
    cityslct.innerHTML=text;
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  cityslct.onchange=citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  chartData={};
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中

  // 存初始数据
  var dealdata={} 
  for(var item in aqiSourceData){
    if (cityslct.value==item) { 
      dealdata=aqiSourceData[item];

    }
  }
  switch(pageState.nowGraTime){
    case 'day':
      chartData = dealdata;
      break;

    case 'week':
      console.log("week");

      var sum=0,i=0;
      var week=0;
      for(var item in dealdata ){
        sum+=dealdata[item];
        i++;

        if (new Date(item).getDay()==6) {
          week++;
          console.log(week);
          chartData['2016第'+week+'周']=parseInt(sum/i);
          i=0;
          sum=0;
        }
      }
      if(i!=0 ){
          week++;
          chartData['2016第'+week+'周']=parseInt(sum/i);

        }
      break;



    case 'month':
      var sum=0,i=0;
      var month=1;
      for(var item in dealdata){
        var date=new Date(item);
        if (date.getMonth()!=month) {
            month=date.getMonth();
            if (sum!=0) {
              chartData[date.getFullYear()+'-'+month+'月']=parseInt(sum/i);
              sum=0;
              i=0;

            }      
        }
        sum+=dealdata[item];
        i++;
      }

      if (i!=0) {
              month++;
              chartData[date.getFullYear()+'-'+month+'月']=parseInt(sum/i);
        }
      break;  
  }

  renderChart();


}

// tip标签显示与隐藏
function see(e){
  var item=e.firstChild;
  item.style.visibility='visible';
}
function usee(e){
  var item=e.firstChild;
  item.style.visibility='hidden';
}


/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();