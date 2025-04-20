
# HTTP Signup Form - Node.js Assignment

This project demonstrates the usage of the HTTP module in Node.js by creating a basic HTTP server with a signup form.

## Instructions

1. Create an HTTP server using the `http` module.
2. Run the server on port **8080**.
3. Implement the following routes:

### `/`
- Response: HTML link to the signup page.

### `/signup` (GET)
- Render an HTML signup form with fields for `username` and `password`.

### `/signup` (POST)
- Handle form submission.
- Store the user data in `db.json` file.
- Respond with: `Thank You for Signup...!!!`

### `/allusers`
- Display all registered users.
- Hide passwords with asterisks (`*`).

### Other Routes
- Respond with `404 Page not found` for unspecified routes.

## Files

- `index.js` - Main server file.
- `signupForm.html` - HTML form served to users.
- `db.json` - JSON file to store user data.

## How to Run

1. Install Node.js.
2. Create `db.json` file with initial content:
    ```json
    {
      "users": []
    }
    ```
3. Create `signupForm.html` with a basic signup form.
4. Run the server:
    ```bash
    node index.js
    ```
5. Visit `http://localhost:8080` in your browser.

## Example Signup Form (signupForm.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Signup</title>
</head>
<body>
    <h2>Signup Form</h2>
    <form action="/signup" method="POST">
        <label for="username">Username:</label>
        <input type="text" name="username" required><br><br>
        <label for="password">Password:</label>
        <input type="password" name="password" required><br><br>
        <input type="submit" value="Signup">
    </form>
</body>
</html>
```

---


