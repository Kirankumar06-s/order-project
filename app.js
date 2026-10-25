
const http = require("http");

let orders = [];

const page = `
<!DOCTYPE html>
<html>
<head>
    <title>Order System V2</title>
</head>
<body>
    <h1>Order System - Version 2</h1>

    <h2>Place Order</h2>
    <form action="/order" method="GET">
        <input name="item" placeholder="Enter order name" required>
        <button type="submit">Place Order</button>
    </form>

    <h2>View Orders</h2>
    <a href="/orders">View All Orders</a>

    <p>Version 2 Features: Place Order and View Orders</p>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:3000");

    if (url.pathname === "/order") {
        const item = url.searchParams.get("item");

        if (item) {
            orders.push(item);
            res.writeHead(200, { "Content-Type": "text/html" });
            return res.end(`
                <h1>Order placed successfully!</h1>
                <p>Item: ${item}</p>
                <a href="/">Back to Home</a>
            `);
        }
    }

    if (url.pathname === "/orders") {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(`
            <h1>All Orders - Version 2</h1>
            ${orders.length
                ? "<ul>" + orders.map(item => `<li>${item}</li>`).join("") + "</ul>"
                : "<p>No orders yet.</p>"}
            <a href="/">Back to Home</a>
        `);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(page);
});

server.listen(3000, () => {
    console.log("Order System V2 running at http://localhost:3000");
});
