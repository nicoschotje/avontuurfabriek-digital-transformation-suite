// Tab Navigation
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.tab);
    if(target) target.classList.add('active');
    initCharts();
  });
});

const chartInstances = {};
function initCharts() {
  const defaults = {color:'#94a3b8',borderColor:'rgba(255,255,255,0.06)'};
  Chart.defaults.color = defaults.color;
  Chart.defaults.borderColor = defaults.borderColor;

  // ROI Chart
  const roiEl = document.getElementById('roiChart');
  if(roiEl && roiEl.offsetParent !== null && !chartInstances.roi) {
    chartInstances.roi = new Chart(roiEl, {
      type:'bar',
      data:{labels:['Landing Pages','Operations','Communication','Intelligence','Setup'],
        datasets:[{label:'Investering',data:[600,700,500,400,300],backgroundColor:'rgba(249,115,22,0.6)',borderRadius:6},
          {label:'Jaar 1 Waarde',data:[5760,1200,780,650,360],backgroundColor:'rgba(16,185,129,0.6)',borderRadius:6}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{ticks:{callback:v=>'\u20AC'+v}}}}
    });
  }

  // Revenue Chart
  const revEl = document.getElementById('revenueChart');
  if(revEl && revEl.offsetParent !== null && !chartInstances.rev) {
    const months = ['Mrt','Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec','Jan','Feb'];
    chartInstances.rev = new Chart(revEl, {
      type:'line',
      data:{labels:months,
        datasets:[{label:'Met SPA Dashboards',data:[15000,16200,17800,19500,21000,22800,24500,26000,27800,29500,31000,32500],borderColor:'#10b981',backgroundColor:'rgba(16,185,129,0.1)',fill:true,tension:0.4},
          {label:'Zonder Dashboards',data:[15000,15200,15400,15600,15800,16000,16200,16400,16600,16800,17000,17200],borderColor:'#ef4444',backgroundColor:'rgba(239,68,68,0.05)',fill:true,tension:0.4,borderDash:[5,5]}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},scales:{y:{ticks:{callback:v=>'\u20AC'+v.toLocaleString()}}}}
    });
  }

  // PH Chart
  const phEl = document.getElementById('phChart');
  if(phEl && phEl.offsetParent !== null && !chartInstances.ph) {
    chartInstances.ph = new Chart(phEl, {
      type:'doughnut',
      data:{labels:['Wil Digitale Tools (77%)','Heeft Tools (16%)','Geen Interesse (7%)'],
        datasets:[{data:[77,16,7],backgroundColor:['#f97316','#10b981','#334155'],borderWidth:0}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}
    });
  }

  // PBA Chart
  const pbaEl = document.getElementById('pbaChart');
  if(pbaEl && pbaEl.offsetParent !== null && !chartInstances.pba) {
    chartInstances.pba = new Chart(pbaEl, {
      type:'bar',
      data:{labels:['2026','2027','2028','2029','2030'],
        datasets:[{label:'Klanten',data:[5,20,50,100,200],backgroundColor:'rgba(59,130,246,0.6)',borderRadius:6,yAxisID:'y'},
          {label:'Revenue (\u20AC)',data:[12500,100000,375000,750000,1500000],type:'line',borderColor:'#f97316',backgroundColor:'rgba(249,115,22,0.1)',fill:true,tension:0.4,yAxisID:'y1'}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}},
        scales:{y:{position:'left',ticks:{callback:v=>v+' klanten'}},y1:{position:'right',grid:{drawOnChartArea:false},ticks:{callback:v=>'\u20AC'+v.toLocaleString()}}}}
    });
  }
}
initCharts();
