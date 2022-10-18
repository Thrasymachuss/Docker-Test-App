const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const getServer = (prisma) => {
  const app = express();

  app.use(express.static(__dirname + "/public"));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.get("/user-info", async (_, res) => {
    try {
      const info = await prisma.User.findUnique({
        where: {
          account: "main",
        },
      });

      if (!info) {
        const newUser = await prisma.User.create({
          data: {
            account: "main",
            name: "Ryan",
            color: "Blue",
          },
        });
        res.status(200);
        res.json(newUser);
        return;
      }

      res.status(200);
      res.json(info);
    } catch (error) {
      res.status(400);
      res.json({ msg: "Something went wrong.", error });
    }
  });

  app.post("/update-user", async (req, res) => {
    try {
      const name = req.body?.name;
      const color = req.body?.color;

      if (!name || !color) {
        res.status(400);
        res.json({ msg: "Please include all required fields" });
        return;
      }

      const updated = await prisma.User.update({
        where: {
          account: "main",
        },
        data: {
          name,
          color,
        },
      });

      if (updated) {
        res.status(200);
        res.json(updated);
        return;
      }

      const newUser = await prisma.User.create({
        data: {
          account: "main",
          name: "Ryan",
          color: "Blue",
        },
      });
      res.status(200);
      res.json(newUser);
    } catch (error) {
      res.status(400);
      res.json({ msg: "Something went wrong.", error });
    }
  });

  return app;
};

module.exports = getServer;
