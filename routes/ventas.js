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

router.post("/", veryToken, isAdmin, uploader.array("images"), (req, res) => {
  let images;
  let venta = { ...req.body };
  if (req.files.length) {
    images = req.files.map((file) => file.path);
    venta['images']=images
  }
  let detalle_credito = {
    pago_mensual: req.body["pago_mensual"],
    meses: req.body["meses"],
    años: req.body["años"],
    fecha_inicial: req.body["fecha_inicial"],
    principal: req.body["principal"],
    tasa: req.body["tasa"],
    enganche_$: req.body["enganche_$"],
    "enganche_%": req.body["enganche_%"],
  };
  venta['detalle_credito']=detalle_credito

  Venta.create(venta)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.patch(
  "/:id",
  veryToken,
  isAdmin,
  uploader.array("images"),
  (req, res) => {
    let images;
    let venta = { ...req.body };
    if (req.files.length) {
      images = req.files.map((file) => file.path);
      venta['images']=images
    }
    let detalle_credito = {
      pago_mensual: req.body["pago_mensual"],
      meses: req.body["meses"],
      años: req.body["años"],
      fecha_inicial: req.body["fecha_inicial"],
      principal: req.body["principal"],
      tasa: req.body["tasa"],
      enganche_$: req.body["enganche_$"],
      "enganche_%": req.body["enganche_%"],
    };
    venta['detalle_credito']=detalle_credito
    const { id } = req.params;
    Venta.findByIdAndUpdate(id, venta, { new: true })
      .then((result) => {
        res.status(200).json({ result });
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

module.exports = router;
