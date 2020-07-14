const { Schema, model } = require("mongoose");

const ventaShema = new Schema(
  {
    tipo_de_venta: {
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
    vendedor: {
      type: String,
    },
    comision: {
      type: Number,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lote: {
      type: Schema.Types.ObjectId,
      ref: "Lote",
    },
    pagos: {
      type: [
        {
          monto: Number,
          fecha: Date,
          status: {
            type: String,
            enum: ["Pagado", "Pendiente"],
            default: "Pendiente",
          },
        },
      ],
    },
    pagado: {
      type: Number,
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

module.exports = model("Venta", ventaShema);
