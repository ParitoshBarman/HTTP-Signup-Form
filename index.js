const http = require('http');
const fs = require('fs');


// Helper function: Converts query string like "username=abc&password=123" into a JavaScript object
function requestStringToJSObject(stringData) {
    let obj = {};
    let dataList = stringData.split('&'); // Split by '&' to get key=value pairs
    dataList.forEach(element => {
        obj[element.split('=')[0]] = element.split('=')[1];  // Split key and value and store in object
    });

    return obj;
}


// Helper function: Hides password by replacing characters with '*'
function hidePassWithStar(password) {
    let totalStar = '';
    for (let i = 0; i < password.length; i++) {
        totalStar += '*';
    }
    return totalStar;
}


// Creating the HTTP server
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('Our server is running go to <a href="/signup">SignUp Page</a> or <a href="/allusers">Allusers Page</a>')
    }

    // POST request on /signup route - collects data from the form and stores in db.json
    else if (req.url == '/signup' && req.method == 'POST') {
        let data = '';
         // Collecting data from the request body
        req.on('data', (chunk) => {
            data += chunk;
        })

        // Once data is received completely
        req.on('end', () => {
            let usersData = JSON.parse(fs.readFileSync('db.json', 'utf-8')); // Read existing users from file
            usersData.users.push(requestStringToJSObject(data))      // Convert query string to object and push to array
            fs.writeFileSync('db.json', JSON.stringify(usersData), 'utf-8');  // Save updated users back to file
            res.end(`Thank You for Signup...!!!`);
        })

    }

    // GET request on /signup route - serves the signup HTML form
    else if (req.url == '/signup') {
        let htmlData = fs.readFileSync('signupForm.html', 'utf-8');// Read HTML form from file
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlData);
    }

    // Route to list all registered users (with passwords hidden)
    else if (req.url == '/allusers') {
        let usersData = JSON.parse(fs.readFileSync('db.json', 'utf-8'));// Read users data
        let allUser = '';
        usersData.users.forEach((itm) => {
            allUser += `Username: ${itm.username}, Password: ${hidePassWithStar(itm.password)}\n`; // Hide password
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`All users\n${allUser}`);
    }

    // 404 route - for any undefined routes
    else {
        res.statusCode = 404;
        res.end('404 Page not found')
    }
})


server.listen(8080, () => {
    console.log('Server is listing port 8080');
})