const { Schema, model } = require("mongoose");

const pagoShema = new Schema(
  {
    venta: {
      type: Schema.Types.ObjectId,
      ref: "Venta",
      required: [true, "Debes asociarlo a una venta"]
    },
    referencia: {
      type: Schema.Types.ObjectId,
    },
    monto: {
      type: Number,
      required: [true, "Debes agregar un monto"]
    },
    fecha: {
      type: Date,
      required: [true, "Debes agregar una fecha"]
    },
    medio_de_pago: {
      type: String,
    },
    comprobante: {
      type: String,
    },
    comentarios: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Pago", pagoShema);
