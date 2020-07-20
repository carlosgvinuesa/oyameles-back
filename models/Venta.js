const { Schema, model } = require("mongoose");

const ventaShema = new Schema(
  {
    tipo_de_venta: {
      type: String,
      enum: ["Credito", "Contado", "Otro"],
    },
    detalle_credito: {
      type: {
        fecha_inicial: Date,
        enganche_$: Number,
        "enganche_%": Number,
        principal: Number,
        tasa: Number,
        años: Number,
        meses: Number,
        pago_mensual: Number,
      },
    },
    vendedor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comision: {
      type: Number,
    },
    fecha: {
      type: Date,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lote: {
      type: Schema.Types.ObjectId,
      ref: "Lote",
    },
    comentarios: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Venta", ventaShema);
