const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");
const { veryToken, isAdmin } = require("../helpers/auth");
const uploader = require("../helpers/multer");

// INICIO ADMIN
router.get("/", veryToken, isAdmin, (req, res) => {
  Venta.find()
    .populate("client")
    .populate("vendedor")
    .populate("lote")
    .populate("pagos_hechos")
    .then((result) => {
      // const populated = Lote.populate(result, {
      //   path: "client",
      //   populate: "user",
      // });
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", veryToken, isAdmin, (req, res) => {
  Venta.create({ ...req.body })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.patch("/:id", veryToken, isAdmin, (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  Venta.findByIdAndUpdate(id, req.body, { new: true })
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

module.exports = router;
