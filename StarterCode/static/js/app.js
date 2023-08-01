const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it, this code is to test
d3.json(url).then(function(data) {
  console.log(data);
});

// This function is called when a dropdown menu item is selected
function updatedropdown() {
    // Use D3 to select the dropdown menu, this variable pulls the ID to the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

// Fetch the JSON data and console log it, this code is to test
d3.json(url).then(function(data) {
    console.log(data);
    let names = data.names
    names.forEach((sample) => {
        dropdownMenu
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    updatemetadata(names[0])
    updatecharts(names[0])
  });



}
updatedropdown()

function updatemetadata(x) {
    // Use D3 to select the dropdown menu, this variable pulls the ID to the dropdown menu
    let dropdownMenu = d3.select("#sample-metadata");

// Fetch the JSON data and console log it, this code is to test
d3.json(url).then(function(data) {
    console.log(data);
    let metadata = data.metadata
    let filteredmetadata = metadata.filter(number => number.id == x)[0];
    dropdownMenu.html("")
// Prints key-value pairs
Object.entries(filteredmetadata).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
    dropdownMenu
            .append("h5")
            .text(` ${key}: ${value}`)
  });

  });
}
function optionChanged(x){
    updatemetadata(x)
    updatecharts(x)
}

function updatecharts(x) {
    
// Fetch the JSON data and console log it, this code is to test
d3.json(url).then(function(data) {
    console.log(data);
    let samplesdata = data.samples
    let filteredsamplesdata = samplesdata.filter(number => number.id == x)[0];
otu_ids = filteredsamplesdata.otu_ids
sample_values = filteredsamplesdata.sample_values
otu_labels = filteredsamplesdata.otu_labels

var bubbledata = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  }];
  
  var bubblelayout = {
    title: 'Bubble Chart',
    showlegend: false,
  };
  
  Plotly.newPlot('bubble', bubbledata, bubblelayout);
  
  var bardata = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    name: 'Bar Chart',
    orientation: 'h',
    marker: {
      color: 'rgba(55,128,191,0.6)',
      width: 1
    },
    type: 'bar'
  }];
  
  var barlayout = {
    title: 'Belly-Button Bar Chart',
  };
  
  Plotly.newPlot('bar', bardata, barlayout);

  });
}