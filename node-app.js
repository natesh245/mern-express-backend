const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/users") {
    res.write(`<h1>Users Page</h1>
                <ul>
                    <li>Natesh</li>
                    <li>user 2</li>
                    <li>user 3</li>
                </ul>
               `);
    return res.end();
  } else if (req.url === "/posts") {
    res.write(`<h1>Posts</h1>
    <ul>
        <li>Post1 </li>
        <li>Post 2</li>
        <li>Post 3</li>
    </ul>`);
    return res.end();
  }

  res.write("<h1>Welcome Home</h1>");
  return res.end();
});

server.listen(4000, () => {
  console.log("listening on port 4000");
  console.log("http://localhost:4000");
});
