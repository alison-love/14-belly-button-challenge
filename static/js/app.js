// Function to initialize the dashboard
function init() {
    // Use D3 to select the dropdown menu
    const dropdown = d3.select("#selDataset");

    // Use D3 to read in `samples.json`
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
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
            title: "Top 10 OTUs Found in Individual",
            margin: { t: 30, l: 150 },
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
            title: 'Bacteria Cultures Per Sample',
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' },
            margin: { t: 0 },
            hovermode: 'closest'
        };

        // Render the bubble chart
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

       
       
       
       
       
       
       
        // Gauge chart code starts here
        const washingFreq = selectedMetadata.wfreq;

        const gaugeData = [{
            type: "indicator",
            mode: "gauge+number",
            value: washingFreq,
            title: { text: "Belly Button Washing Frequency<br>Scrubs per Week", font: { size: 24 } },
            gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "rgba(8,29,88,0)" }, // Hide the bar
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "rgba(232, 226, 202, .5)" },
                    { range: [1, 2], color: "rgba(210, 206, 145, .5)" },
                    { range: [2, 3], color: "rgba(202, 209, 95, .5)" },
                    { range: [3, 4], color: "rgba(170, 202, 42, .5)" },
                    { range: [4, 5], color: "rgba(110, 154, 22, .5)" },
                    { range: [5, 6], color: "rgba(14, 127, 0, .5)" },
                    { range: [6, 7], color: "rgba(10, 120, 22, .5)" },
                    { range: [7, 8], color: "rgba(10, 110, 22, .5)" },
                    { range: [8, 9], color: "rgba(10, 100, 22, .5)" }
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