let globalData;


// Function to initialize the dashboard
function init() {
    // Use D3 to select the dropdown menu
    const dropdown = d3.select("#selDataset");

    // Use D3 to read in `samples.json`
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        globalData = data;
        console.log("Data loaded:", data);  // Debugging line    
    // Populate the dropdown menu with test subject IDs
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        // Use the first test subject ID from the list to build the initial plots
        const firstSample = data.names[0];
        buildCharts(firstSample, data);
        buildMetadata(firstSample, data);
    });
}

function optionChanged(newSample) {
    buildCharts(newSample, globalData);
    buildMetadata(newSample, globalData);
}

// // Function to build the charts
function buildCharts(sample,data) {
        // Filter the data for the selected sample
        const selectedSample = data.samples.filter(obj => obj.id == sample)[0];
        const selectedMetadata = data.metadata.filter(obj => obj.id == sample)[0];
        console.log("Selected Sample:", selectedSample);  // Debugging line
        console.log("Selected Metadata:", selectedMetadata);  // Debugging line

        // Sort by sample_values and slice to get top 10
        const sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        const otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
        const otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();


        const barData = [{
            x: sampleValues,
            y: otuIds.map(id => `OTU ${id}`),
            text: otuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: '#6C3483'}
        }];
    
        const barLayout = {
            //title: "Top 10 OTUs Found in Individual",
            title: { text: "Top 10 OTUs <br> Found in Individual", font: { size: 24 } },
            margin: { t: 100, l: 150, b: 100 },
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };

        // Render the bar chart
        Plotly.newPlot('bar', barData, barLayout);



        const bubbleData = [{
            x: selectedSample.otu_ids,
            y: selectedSample.sample_values,
            text: selectedSample.otu_labels,
            mode: 'markers',
            marker: {
                size: selectedSample.sample_values,
                color: selectedSample.otu_ids,
                colorscale: 'Viridis'}
        }];
    
        const bubbleLayout = {
            title: { text: "Bacteria Cultures Per Sample", font: { size: 24 } },
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' },
            margin: { t: 100 },
            hovermode: 'closest'
        };

        // Render the bubble chart
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

       
       
// ***************** BONUS: Gauge chart code ****************
        const washingFreq = selectedMetadata.wfreq;

        const gaugeData = [{
            type: "indicator",
            mode: "gauge+number",
            value: washingFreq,
            title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 24 } },
            gauge: {
                axis: { range: [null, 9] },
                bar: { color: "rgba(8,29,88,0)" }, // Hide the bar
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#FDE725FF" },
                    { range: [1, 2], color: "#B8DE29FF" },
                    { range: [2, 3], color: "55C667FF" },
                    { range: [3, 4], color: "20A387FF" },
                    { range: [4, 5], color: "#238A8DFF" },
                    { range: [5, 6], color: "2D708EFF" },
                    { range: [6, 7], color: "39568CFF" },
                    { range: [7, 8], color: "453781FF" },
                    { range: [8, 9], color: "481567FF" }
                ],
                threshold: {
                    line: { color: "black", width: 4 },
                    thickness: 0.75,
                    value: washingFreq
                }
            }
        }];

        const gaugeLayout = {
            width: 600,
            height: 450,
            margin: { t: 0, b: 0 },
            paper_bgcolor: "white",
            font: { color: "black", family: "Arial" }
        };

        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    }
// *************************************************************************************


function buildMetadata(sample, data) {
        // Filter the metadata for the selected sample
        const selectedMetadata = data.metadata.filter(obj => obj.id == sample)[0];
        console.log("Metadata for sample:", selectedMetadata);  // Debugging line

        // Use D3 to select the panel for sample metadata
        const metadataPanel = d3.select("#sample-metadata");

        // Clear any existing metadata
        metadataPanel.html("");

        // Add each key-value pair to the panel
        Object.entries(selectedMetadata).forEach(([key, value]) => {
            metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
}

// Initialize the dashboard
init();