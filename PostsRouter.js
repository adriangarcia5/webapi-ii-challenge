const express = require("express");

const dataB = require("./data/db.js");

const router = express.Router();


//---------GET REQUEST---------
router.get("/", (req, res) => {
  dataB
    .find()
    .then(post => {
      res.status(200).send(post);
    })
    .catch(error => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

//---------GET REQUEST---------
router.get("/:id", (req, res) => {
  const id = req.params.id;
  dataB
    .findById(id)
    .then(post => {
      if (post[0]) {
        res.send(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//---------GET REQUEST---------
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  dataB
    .findCommentById(id)
    .then(comment => {
      if (comment[0]) {
        res.send(comment);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//---------POST REQUEST---------
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    dataB
      .insert(req.body)
      .then(post => {
        res.status(201).json(req.body);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

//---------POST REQUEST---------
router.post("/:id/comments", (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    });
  } else {
    dataB
      .insertComment(req.body)
      .then(comment => {
        if (comment) {
          res.status(201).json(req.body);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        });
      });
  }
});

//---------DELETE REQUEST---------
router.delete("/:id", (req, res) => {
  dataB
    .remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

//---------PUT REQUEST---------
router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    dataB
      .update(req.params.id, req.body)
      .then(post => {
        if (post) {
          res.status(200).json(req.body);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  }
});




module.exports = router;