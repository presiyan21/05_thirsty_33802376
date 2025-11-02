const express = require("express");
const router = express.Router();

// Shop data
var shopData = {
  shopName: "The Thirsty Student",
  productCategories: ["Beer", "Wine", "Soft Drinks", "Hot Drinks", "Juices", "Mocktails"],
  shops: [
    {
      location: "Campus Central (Goldsmiths SU)",
      manager: "Alice Johnson",
      address: "Dixon Road, New Cross, London SE14 6NW"
    },
    {
      location: "Deptford Bridge",
      manager: "Bob Smith",
      address: "5 Deptford Bridge, London SE8 4HH"
    },
    {
      location: "New Cross Gate",
      manager: "Carol Lee",
      address: "70 New Cross Road, London SE14 5BA"
    },
    {
      location: "Greenwich Park",
      manager: "David Kim",
      address: "14 King George Street, London SE10 8QJ"
    },
    {
      location: "Lewisham Centre",
      manager: "Emma Patel",
      address: "Unit 10, Lewisham Shopping Centre, London SE13 7HB"
    }
  ]
};

// ROUTES 
// Home page
router.get("/", (req, res) => {
  res.render("index.ejs", shopData);
});

// About page (lists all shop locations)
router.get("/about", (req, res) => {
  res.render("about.ejs", shopData);
});

// Search form
router.get("/search", (req, res) => {
  res.render("search.ejs", shopData);
});

// Display search results
router.get("/search_result", (req, res) => {
  res.send("You searched for " + req.query.search_text + " in " + req.query.category);
});

// Registration form
router.get("/register", (req, res) => {
  res.render("register.ejs", shopData);
});

// Handle registration submission
router.post("/registered", (req, res) => {
  const first = req.body.first.trim();
  const last = req.body.last.trim();
  const email = req.body.email.trim();

  // Validation patterns
  const namePattern = /^[A-Za-z\s'-]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!namePattern.test(first) || !namePattern.test(last)) {
    return res.send("Invalid name: please use letters only.");
  }
  if (!emailPattern.test(email)) {
    return res.send("Invalid email address. Please go back and try again.");
  }

  res.send(`Hello ${first} ${last}, you are now registered with email ${email}!`);
});

// Survey form
router.get("/survey", (req, res) => {
  res.render("survey.ejs", shopData);
});

// Handle survey submission
router.post("/survey_result", (req, res) => {
  const { first, last, email, age, drink_category, is_student } = req.body;

  // Validate inputs
  const namePattern = /^[A-Za-z\s'-]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!namePattern.test(first) || !namePattern.test(last)) {
    return res.send("Invalid name. Please use letters only for first and last name.");
  }
  if (!emailPattern.test(email)) {
    return res.send("Invalid email address.");
  }
  if (!age || isNaN(age) || age < 10 || age > 120) {
    return res.send("Invalid age. Please enter a number between 10 and 120.");
  }
  if (!drink_category) {
    return res.send("Please select a drink category.");
  }

  // Render result page with submitted data
  res.render("survey_result.ejs", {
    ...shopData,
    survey: req.body
  });
});

module.exports = router;




