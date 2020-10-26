$(window).on("resize", function(){


    Plotly.relayout("bar",{
        width: window.innerWidth*.4,
        height: window.innerHeight*.45,
    })
    Plotly.relayout("my_dataviz",{
        width: window.innerWidth*.4,
        height: window.innerHeight*.45,
    })


})    
function buildCharts(state) {
    var town=[];
    let counter = {};

queryUrl = "/api/" + state
d3.json(queryUrl).then(data => {

    //Build bar chart
    const estados= data.filter(x => x.state == state);
    console.log(estados)
    for (var i = 0; i < estados.length; i++) {
        town.push(estados[i].city)
    };
    console.log(town) 
      for (let i = 0; i < town.length; i++) {
          let item = town[i];
          counter[item] = (counter[item] + 1) || 1;
      }
    console.log(counter)
    var sortable = []
    for (var x in counter) {
        sortable.push([x, counter[x]])
    };
    sortable.sort(function (a,b){
        return b[1] - a[1]
    })
    console.log(sortable)
    var topTen = sortable.slice(0,10)
    console.log(topTen)
    var topTenObj = {};
    topTen.forEach(function (x){
        topTenObj[x[0]] = x[1]
    })
    console.log(topTenObj)  
    const bardata = [
        {
            y: Object.values(topTenObj),
            x: Object.keys(topTenObj),
            type: "bar",
        }
    ]
    var barlayout = {
        title:`Top Ten Haunted cities of ${state}`,
        margin: { t:30, l: 150}
    };
    Plotly.newPlot("bar", bardata, barlayout)

    //Build pie chart
    var loca= data.filter(x => x.state == state);
    var local = []
    var myWords = []
    for (var i = 0; i < loca.length; i++) {
        local.push(loca[i].location) 
    };
    var counta = {}
    var sorta = []
    for (let i = 0; i < local.length; i++) {
        let ite = local[i];
        counta[ite] = (counta[ite] + 1) || 1;
    }
    for (var x in counta) {
        sorta.push([x, counta[x]])
    };
    sorta.sort(function (a,b){
        return b[1] - a[1]
    })
    console.log(sorta)
    var topTena = sorta.slice(0,10)
    console.log(topTena)
    var topTenObja = {};
    topTena.forEach(function (x){
        topTenObja[x[0]] = x[1]
    })
    console.log(topTenObja)  
    const piedata = [
        {
            values: Object.values(topTenObja),
            labels: Object.keys(topTenObja),
            type: "pie",
        }
    ];
    var pielayout = {
        title:`Top Ten Haunted locations in ${state}`,
        height: 400,
        width: 500
    };
    Plotly.newPlot("my_dataviz", piedata, pielayout)

    //Build table with cities
    buildTable(data, state);
})
};

//Cities table
function buildTable(data, state) {
    var tbody = d3.select("tbody");
    tbody.html("");
    // d3.json(queryUrl).then(data => {
        const estados= data.filter(x => x.state == state)
        var final = estados.map(function(x){
            return {
                City : x.city,
                Location: x.location, 
                Description: x.description}
        })
        final.forEach(function(cityReport) {
        var row = tbody.append("tr"); 
        Object.entries(cityReport).forEach(function([key, value]) {
          var cell = row.append("td");
          cell.text(value);
         })}
     );
    //})
};

function init() {
console.log('hello');
const firstState = "Alabama";
buildCharts(firstState);
};

function optionChanged(newState) {
buildCharts(newState);
};
init();