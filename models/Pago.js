const { Schema, model } = require("mongoose");

const pagoShema = new Schema(
  {
    tipo_de_pago: {
      type: String,
      enum: ["Credito", "Contado", "Otro"],
      default: "Contado",
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
    pagos_hechos: {
      type: [
        {
          pago: Number,
          fecha: Date,
          medio_de_pago: String,
          comprobante: String,
        },
      ],
    },
    pagado: {
      type: Number,
    },
    pagos_pendientes: {
      type: [
        {
          pago: Number,
          fecha: Date,
        },
      ],
    },
    pendiente: {
      type: Number,
    },
    comentarios: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Pago", pagoShema);
