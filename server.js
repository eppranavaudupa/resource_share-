const express = require("express");
const app = express();
const fs = require('fs');
const PORT = 8080;

app.use(express.json());

app.get("/udupa", (req, res) => {
    const indexPath = __dirname + '/index.html';
    const dataPath = __dirname + '/data.txt';
    
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading data.txt:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Read the HTML file and inject the data into it
        fs.readFile(indexPath, 'utf-8', (err, html) => {
            if (err) {
                console.error('Error reading index.html:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Inject the data into the HTML (e.g., into a specific <div> or <p>)
            const modifiedHtml = html.replace('<!-- Data Placeholder -->', data);

            // Send the modified HTML to the client
            res.send(modifiedHtml);
        });
    });
});

app.post('/source', (req, res) => {
    const data = req.body.message;  // Access the message field from the request body
    console.log('Data received from frontend:', data);
    
    // Save the received data to the data.txt file
    fs.writeFileSync('data.txt', data, "utf-8");

    res.json({ message: 'Data received successfully', data });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
