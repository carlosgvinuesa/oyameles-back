const express = require("express");
const router = express.Router();
const Lote = require("../models/Lote");
const { veryToken, isAdmin } = require("../helpers/auth");
const uploader = require("../helpers/multer");

// INICIO ADMIN
router.get("/lotes", veryToken, isAdmin, (req, res) => {
  Lote.find(req.query)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", veryToken, isAdmin, uploader.array("images"), (req, res) => {
  const images = req.files.map((file) => file.path);
  const precio_total = req.body.precio_m2 * req.body.area;
  const lote = { ...req.body, precio_total: precio_total, images };
  Lote.create(lote)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.patch(
  "/:id",
  veryToken,
  isAdmin,
  uploader.array("images"),
  (req, res) => {
    const images = req.files.map((file) => file.path);
    const precio_total = req.body.precio_m2 * req.body.area;
    const lote = { ...req.body, precio_total: precio_total, images };
    const { id } = req.params;
    Lote.findByIdAndUpdate(id, lote, { new: true })
      .then((result) => {
        res.status(200).json({ result: result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

router.delete("/:id", veryToken, isAdmin, (req, res) => {
  const { id } = req.params;
  Lote.findByIdAndRemove(id)
    .then((result) => {
      res.status(200).json({ result: result });
    })
    .catch((err) => res.status(400).json(err));
});
// FIN ADMIN

router.get("/", veryToken, (req, res) => {
  const { _id: client } = req.user;
  Lote.find({ client })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", veryToken, (req, res) => {
  const { _id: client } = req.user;
  const { id } = req.params;
  Lote.findOne({ _id: id, client })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
