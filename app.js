
const http = require("http");

let orders = [];
let nextId = 1;

const page = `
<!DOCTYPE html>
<html>
<head>
    <title>Order System V3</title>
</head>
<body>
    <h1>Order System - Version 3</h1>

    <h2>Place Order</h2>
    <form action="/order" method="GET">
        <input name="item" placeholder="Enter order name" required>
        <button type="submit">Place Order</button>
    </form>

    <h2>View Orders</h2>
    <a href="/orders">View All Orders</a>

    <p>Version 3 Features: Place, View and Cancel Orders</p>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost:3000");

    if (url.pathname === "/order") {
        const item = url.searchParams.get("item");

        if (!item || !item.trim()) {
            res.writeHead(400);
            return res.end("Please enter an order name.");
        }

        orders.push({ id: nextId++, item: item.trim() });

        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(`
            <h1>Order placed successfully!</h1>
            <p>Item: ${item.replace(/[&<>"']/g, c => ({
                "&": "&amp;", "<": "&lt;", ">": "&gt;",
                '"': "&quot;", "'": "&#39;"
            }[c]))}</p>
            <a href="/">Back to Home</a> |
            <a href="/orders">View Orders</a>
        `);
    }

    if (url.pathname === "/orders") {
        res.writeHead(200, { "Content-Type": "text/html" });

        const list = orders.map(order => `
            <li>
                ${order.item} (ID: ${order.id})
                <form action="/cancel" method="GET" style="display:inline">
                    <input type="hidden" name="id" value="${order.id}">
                    <button type="submit">Cancel</button>
                </form>
            </li>
        `).join("");

        return res.end(`
            <h1>All Orders - Version 3</h1>
            ${list ? `<ul>${list}</ul>` : "<p>No orders yet.</p>"}
            <a href="/">Back to Home</a>
        `);
    }

    if (url.pathname === "/cancel") {
        const id = Number(url.searchParams.get("id"));
        const index = orders.findIndex(order => order.id === id);

        if (index === -1) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end('<p>Order not found.</p><a href="/orders">Back</a>');
        }

        const removed = orders.splice(index, 1)[0];

        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(`
            <h1>Order cancelled successfully!</h1>
            <p>Cancelled: ${removed.item}</p>
            <a href="/orders">View Remaining Orders</a>
        `);
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(page);
});

server.listen(3003, () => {
    console.log("Order System V3 running at http://localhost:3003");
});