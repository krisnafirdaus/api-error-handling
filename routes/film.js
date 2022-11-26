var express = require("express");
var router = express.Router();
var film = [
  {
    id: 1,
    name: "Avenger",
    year: 2020,
    rating: 9,
  },
  {
    id: 2,
    name: "Penari",
    year: 2022,
    rating: 9.5,
  },
];

router.get("/", function (req, res) {
  res.json(film);
});

router.get("/:id", function (req, res) {
  var currMovie = film.filter(function (movie) {
    if (movie.id == req.params.id) {
      return true;
    }
  });

  if (currMovie.length == 1) {
    res.json(currMovie[0]);
  } else {
    res.status(404);
    res.json({ message: "Tidak ditemukan" });
  }
});

router.post("/", function (req, res) {
  if (!req.body.name || !req.body.year || !req.body.rating) {
    res.status(400);
    res.json({
      message: "Request Salah",
    });
  } else {
    var newId = film[film.length - 1].id + 1;
    film.push({
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
    });
    res.json({ message: "Film baru", location: "/movies/" + newId });
  }
});

router.put("/:id", function (req, res) {
  if (!req.body.name || !req.body.year || !req.body.rating || !req.params.id) {
    res.status(400);
    res.json({
      message: "Request Salah",
    });
  } else {
    var updateIndex = film
      .map((movie) => {
        return movie.id;
      })
      .indexOf(parseInt(req.params.id));

    if (updateIndex === -1) {
      film.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
      });
      res.json({
        message: "Film baru terbuat",
        location: "/film/" + req.params.id,
      });
    } else {
      film[updateIndex] = {
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
      };
      res.json({
        message: "Film baru terupdate",
        location: "/film/" + req.params.id,
      });
    }
  }
});

router.delete("/:id", function (req, res) {
  var removeIndex = film
    .map((movie) => {
      return movie.id;
    })
    .indexOf(parseInt(req.params.id));

  if (removeIndex === -1) {
    res.json({
      message: "Film tidak ditemukan",
    });
  } else {
    film.splice(removeIndex, 1);
    res.send({
      message: "Film id " + req.params.id + " terhapus",
    });
  }
});

module.exports = router;
