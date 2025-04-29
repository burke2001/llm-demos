// Election data
const electionData = `jurisdiction,harris,trump,oliver,stein,kennedy,others,total
Allegany,9231,22141,130,136,363,136,32137
Anne Arundel,171945,128892,2141,2429,3375,2790,311572
Baltimore City,195109,27984,892,3222,1875,1672,230754
Baltimore County,249958,149560,2240,4195,3858,3104,412915
Calvert,23438,29361,297,232,554,309,54191
Caroline,4860,11053,84,99,180,54,16330
Carroll,36867,62273,845,629,1182,855,102651
Cecil,17628,33871,291,286,536,219,52831
Charles,63454,26145,334,828,889,447,92097
Dorchester,6954,9390,57,138,191,42,16772
Frederick,82409,68753,970,1378,1494,1110,156114
Garrett,3456,11983,75,48,223,53,15838
Harford,62453,83050,1023,935,1559,1070,150090
Howard,124764,49425,1246,3341,1712,1803,182291
Kent,5251,5561,60,82,114,60,11128
Montgomery,386581,112637,2416,8009,4276,5302,519221
Prince George's,347038,45008,1038,5369,3428,2128,404009
Queen Anne's,11273,20200,174,153,336,211,32347
Saint Mary's,23531,33582,409,352,669,411,58954
Somerset,4054,5805,32,85,114,47,10137
Talbot,11119,11125,109,120,194,163,22830
Washington,27260,44054,363,513,811,331,73332
Wicomico,21513,24065,205,371,544,214,46912
Worcester,12431,19632,139,184,342,153,32881`;

// Parse CSV data
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const entry = {};
        
        for (let j = 0; j < headers.length; j++) {
            // Convert numeric values to numbers
            if (j > 0) {
                entry[headers[j]] = parseInt(values[j]);
            } else {
                entry[headers[j]] = values[j];
            }
        }
        
        data.push(entry);
    }
    
    return data;
}

// Calculate statewide totals
function calculateStatewideTotals(data) {
    const statewide = {
        harris: 0,
        trump: 0,
        oliver: 0,
        stein: 0,
        kennedy: 0,
        others: 0,
        total: 0
    };
    
    data.forEach(county => {
        statewide.harris += county.harris;
        statewide.trump += county.trump;
        statewide.oliver += county.oliver;
        statewide.stein += county.stein;
        statewide.kennedy += county.kennedy;
        statewide.others += county.others;
        statewide.total += county.total;
    });
    
    return statewide;
}

// Calculate percentages for a given data object
function calculatePercentages(data) {
    const percentages = {};
    
    for (const key in data) {
        if (key !== 'jurisdiction' && key !== 'total') {
            percentages[key] = (data[key] / data.total * 100).toFixed(2);
        }
    }
    
    return percentages;
}

// Display totals data
function displayTotals(data, elementId, includeName = false) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    
    const candidates = ['harris', 'trump', 'oliver', 'stein', 'kennedy', 'others', 'total'];
    const candidateNames = {
        harris: 'Harris',
        trump: 'Trump',
        oliver: 'Oliver',
        stein: 'Stein',
        kennedy: 'Kennedy',
        others: 'Others',
        total: 'Total'
    };
    
    candidates.forEach(candidate => {
        const div = document.createElement('div');
        div.className = 'result-item';
        
        const nameElement = document.createElement('span');
        nameElement.className = 'candidate-name ' + candidate;
        nameElement.textContent = candidateNames[candidate];
        
        const valueElement = document.createElement('span');
        valueElement.className = 'vote-count';
        valueElement.textContent = data[candidate].toLocaleString();
        
        div.appendChild(nameElement);
        div.appendChild(valueElement);
        
        element.appendChild(div);
    });
}

// Display percentages data
function displayPercentages(percentages, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    
    const candidates = ['harris', 'trump', 'oliver', 'stein', 'kennedy', 'others'];
    const candidateNames = {
        harris: 'Harris',
        trump: 'Trump',
        oliver: 'Oliver',
        stein: 'Stein',
        kennedy: 'Kennedy',
        others: 'Others'
    };
    
    candidates.forEach(candidate => {
        const div = document.createElement('div');
        div.className = 'result-item';
        
        const nameElement = document.createElement('span');
        nameElement.className = 'candidate-name ' + candidate;
        nameElement.textContent = candidateNames[candidate];
        
        const valueElement = document.createElement('span');
        valueElement.className = 'vote-percentage';
        valueElement.textContent = percentages[candidate] + '%';
        
        div.appendChild(nameElement);
        div.appendChild(valueElement);
        
        element.appendChild(div);
    });
}

// Create a horizontal bar chart
function createChart(percentages, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    
    const candidates = ['harris', 'trump', 'oliver', 'stein', 'kennedy', 'others'];
    const candidateNames = {
        harris: 'Harris',
        trump: 'Trump',
        oliver: 'Oliver',
        stein: 'Stein',
        kennedy: 'Kennedy',
        others: 'Others'
    };
    
    candidates.forEach(candidate => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        
        const nameElement = document.createElement('div');
        nameElement.className = 'bar-label';
        nameElement.textContent = candidateNames[candidate];
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';
        
        const bar = document.createElement('div');
        bar.className = 'bar ' + candidate;
        bar.style.width = percentages[candidate] + '%';
        
        const valueElement = document.createElement('span');
        valueElement.className = 'bar-value';
        valueElement.textContent = percentages[candidate] + '%';
        
        barWrapper.appendChild(bar);
        barWrapper.appendChild(valueElement);
        
        barContainer.appendChild(nameElement);
        barContainer.appendChild(barWrapper);
        
        element.appendChild(barContainer);
    });
}

// Populate county dropdown
function populateCountyDropdown(data) {
    const dropdown = document.getElementById('county-dropdown');
    
    data.forEach(county => {
        const option = document.createElement('option');
        option.value = county.jurisdiction;
        option.textContent = county.jurisdiction;
        dropdown.appendChild(option);
    });
}

// Update county view based on selected county
function updateCountyView(data) {
    const dropdown = document.getElementById('county-dropdown');
    const selectedCounty = dropdown.value;
    
    const countyData = data.find(county => county.jurisdiction === selectedCounty);
    const percentages = calculatePercentages(countyData);
    
    displayTotals(countyData, 'county-totals-data');
    displayPercentages(percentages, 'county-percentages-data');
    createChart(percentages, 'county-chart');
}

// Switch between statewide and county views
function setupViewSwitching() {
    const statewideBtn = document.getElementById('statewide-btn');
    const countyBtn = document.getElementById('county-btn');
    const statewideView = document.getElementById('statewide-view');
    const countyView = document.getElementById('county-view');
    
    statewideBtn.addEventListener('click', () => {
        statewideBtn.classList.add('active');
        countyBtn.classList.remove('active');
        statewideView.classList.remove('hidden');
        countyView.classList.add('hidden');
    });
    
    countyBtn.addEventListener('click', () => {
        statewideBtn.classList.remove('active');
        countyBtn.classList.add('active');
        statewideView.classList.add('hidden');
        countyView.classList.remove('hidden');
    });
}

// Initialize the application
function init() {
    const parsedData = parseCSV(electionData);
    const statewideTotals = calculateStatewideTotals(parsedData);
    const statePercentages = calculatePercentages(statewideTotals);
    
    // Display statewide results
    displayTotals(statewideTotals, 'statewide-totals-data');
    displayPercentages(statePercentages, 'statewide-percentages-data');
    createChart(statePercentages, 'statewide-chart');
    
    // Set up county view
    populateCountyDropdown(parsedData);
    document.getElementById('county-dropdown').addEventListener('change', () => {
        updateCountyView(parsedData);
    });
    
    // Initialize with first county
    updateCountyView(parsedData);
    
    // Set up view switching
    setupViewSwitching();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
