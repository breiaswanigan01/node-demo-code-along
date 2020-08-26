"use strict";
// linking server.js
const express = require("express");
const routes = express.Router();

const movies = [
  { id: 1, title: "The Invisible Man", year: 2020, animated: false },
  { id: 2, title: "The Godfather", year: 1972, animated: false },
  { id: 3, title: "The Lion King", year: 1994, animated: true },
  { id: 4, title: "Black Panther", year: 2018, animated: false },
];
let nextId = 5;
//GET /movies - respond w/ a JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});

// GET /movies/:id - respond with the id's of the movies
routes.get("/movies/:id", (req, res) => {
  // access any named routers
  // naturally a string
  const id = parseInt(req.params.id);
  // finds movie that has the id
  const movie = movies.find((movie) => movie.id === id);
  //   making the 404 not found appear
  if (movie) {
    //   .json --formats to json
    res.json(movie);
  } else {
    res.status(404);
    // sends whatever string you give it
    res.send(`No movie with id ${id} exists.`);
  }
  res.json(movie);
});
// creating with post -- adding a movie to array
routes.post("/movies", (req, res) => {
  const movie = req.body;
  //   movie ID keeps moving up
  movie.id = nextId++;
  movies.push(movie);
  // created status code
  res.status(201);
  //   sends back movie in json form
  res.json(movie);
});

// delete a movie
routes.delete("/movies/:id", (req, res) => {
  console.log("ran DELETE");
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});
// expport routes for use in server.js
module.exports = routes;
