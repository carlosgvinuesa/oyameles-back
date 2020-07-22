const express = require("express");
const router = express.Router();
const Pago = require("../models/Pago");
const { veryToken, isAdmin } = require("../helpers/auth");
const uploader = require("../helpers/multer");

// INICIO ADMIN
router.get("/pagos", veryToken, isAdmin, (req, res) => {
  Pago.find()
    .populate("venta")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", veryToken, isAdmin, uploader.array("images"), (req, res) => {
  let images;
  let pago = { ...req.body };
  if (req.files.length) {
    images = req.files.map((file) => file.path);
    pago["images"] = images;
  }
  Pago.create( pago )
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.patch("/:id", veryToken, isAdmin, uploader.array("images"), (req, res) => {
  const images = req.files.map((file) => file.path);
  const pago = { ...req.body, images };
  const { id } = req.params;
  Venta.findByIdAndUpdate(id, pago, { new: true })
    .populate("venta")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

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
  Pago.find({ client })
    .populate("venta")
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
