
# Belly Button Biodiversity Dashboard

https://alison-love.github.io/14-belly-button-challenge/

## Project Overview
This project is an interactive web dashboard to explore the Belly Button Biodiversity DataSet, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs) were present in more than 70% of people, while the rest were relatively rare.

## Features

- A bar chart to display the top 10 OTUs found in an individual.
- A bubble chart to display each sample.
- A gauge chart to display the weekly washing frequency of an individual.

## Technologies Used

- JavaScript
- Plotly.js
- D3.js
- HTML5
- Bootstrap

## Getting Started

1. Clone the repository to your local machine.
2. Open `index.html` in your web browser to view the dashboard.

## Dashboard Components

### Bar Chart

The bar chart is a horizontal plot that shows the top 10 OTUs found in the individual selected from the dropdown menu. Each bar represents an OTU, and the size of the bar indicates the frequency of that OTU in the individual's navel.

### Bubble Chart

The bubble chart visualizes the OTUs found in the selected individual. Each bubble's position and size are determined by the OTU ID and the sample value, respectively.

### Gauge Chart

The gauge chart displays the frequency of belly button washing per week for the selected individual. It's a visual representation to indicate whether the individual has a high, medium, or low washing frequency.

## Data Source

The data is fetched from a JSON file that is hosted on a static server. It includes IDs, OTU labels, sample values, and metadata for each individual.

## Deployment

The dashboard is deployed using GitHub Pages. You can view the live dashboard at
https://alison-love.github.io/14-belly-button-challenge/)https://alison-love.github.io/14-belly-button-challenge/.
