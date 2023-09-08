const output = document.getElementById("output");

// Function to fetch and display data
function fetchData() {
    fetch('C:\\Users\\zbcmhlun\\source\\repos\\HuskyLens\\HuskyLens\\bin\\Debug\\net6.0\\output.txt') 
        .then(response => response.text())
        .then(data => {
            // split the content into lines
            const lines = data.split('\n');

            // Find the last non-empty line
            let lastLine = '';
            for (let i = lines.length - 1; i >= 0; i--) {
                const line = lines[i].trim();
                if (line !== '') {
                    lastLine = line;
                    break;
                }
            }

            output.textContent = lastLine;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
 
// Set up a timer to call fetchData every 2 seconds (2000 milliseconds)
setInterval(fetchData, 200);
