const { Schema, model, models } = require("mongoose");

const loteShema = new Schema(
  {
    numero: {
      type: Number,
      required: [true, "Debes agregar un Numero"],
      validate: {
        message: "El numero de lote ya existe",
        validator: async (numero) => {
          const items = await models["Lote"].count({ numero });
          return items < 1;
        },
      },
    },
    area: {
      type: Number,
      required: [true, "Debes agregar un Area"],
    },
    precio_m2: {
      type: Number,
      required: [true, "Debes agregar un Precio"],
    },
    precio_total: {
      type: Number,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["Disponible", "Apartado", "Vendido", "Pagado"],
      default: "Disponible",
    },
    descripcion: {
      type: String,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pagos: {
      type: Schema.Types.ObjectId,
      ref: "Pago",
    },
  },
  { timestamps: true }
);

module.exports = model("Lote", loteShema);
