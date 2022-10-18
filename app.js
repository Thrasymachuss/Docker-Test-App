const getServer = require("./getServer");
const prisma = require("./client.js");

const PORT = 3000;

const app = getServer(prisma);
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
