const express = require('express');
const app = express();
app.use(express.json());

// Require route
const demoRoute = require("./routes/user");

// Use route
app.use("/user", demoRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});