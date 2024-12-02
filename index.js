require("dotenv").config();
const express = require("express");
const mg = require("mongoose");
const Contact = require("./models/contact");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;
const mySecret = process.env["MONGODB_URI"];
const URI = mySecret;


if (!URI) {
  console.error("MONGODB_URI is undefined. Please check your .env file.");
  process.exit(1); // Stop the server if URI is not found
}

mg.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res
    .send({
      msg: "root is working",
    })
    .status(200);
});

app.post("/create-contact", async (req, res) => {
  const { name, number, contactType, link } = req.body;

  if (!name) {
    res.status(400).send({ msg: "name is required" });
  }

  try {
    const newContact = new Contact({
      name,
      number,
      contactType,
      link: {
        emaikID: link.email || "",
        instaID: link.insta || "",
        facebookID: link.facebook || "",
        telegramID: link.telegram || "",
        poortfolio: link.portfolio || "",
      },
    });
    await newContact.save(); // Save the contact to the database
    res
      .status(201)
      .json({ msg: "Contact created successfully", contact: newContact });
  } catch (err) {
    // Handle any errors
    res
      .status(500)
      .json({ error: "Error creating contact", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
