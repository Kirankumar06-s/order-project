
const http = require("http");

const page = `
<!DOCTYPE html>
<html>
<head>
    <title>Order System V1</title>
</head>
<body>
    <h1>Order System - Version 1</h1>
    <h2>Place Order</h2>

    <form action="/order" method="GET">
        <input type="text" name="item"
               placeholder="Enter order name" required>
        <button type="submit">Place Order</button>
    </form>

    <p>Version 1 Feature: Place Order</p>
</body>
</html>
`;


const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:3000");

    if (url.pathname === "/order") {
        const item = url.searchParams.get("item");

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>Order System - Version 1</h1>
            <h2>Order placed successfully!</h2>
            <p>Item: ${item ? item.replace(/[&<>"']/g, "") : ""}</p>
            <a href="/">Place another order</a>
        `);
    } else {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(page);
    }
});


server.listen(3000, "0.0.0.0", () => {
    console.log("Order System V1 running at http://localhost:3000");
});
