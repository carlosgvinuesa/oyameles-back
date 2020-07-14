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
    fase: {
      type: Number,
      required: [true, "Debes agregar una Fase"],
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
    vista: {
      type: [String],
    },
    topografia: {
      type: [String],
    },
    vegetacion: {
      type: [String],
    },
    orientacion: {
      type: String,
    },
    colindancias: {
      type: [String],
    },
    geometria: {
      type: [String],
    },
    descripcion: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Lote", loteShema);
