const express = require("express");
const router = express.Router();
const Pago = require("../models/Pago");
const { veryToken, isAdmin } = require("../helpers/auth");

// INICIO ADMIN
router.get("/pagos", veryToken, isAdmin, (req, res) => {
  Pago.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", veryToken, isAdmin, (req, res) => {
  Pago.create({ ...req.body })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// FIN ADMIN

router.get("/", veryToken, (req, res) => {
  const { _id: client } = req.user;
  Pago.find({ client })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;