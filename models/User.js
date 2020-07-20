const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      validate: {
        message: "El nombre ya existe",
        validator: async (nombre) => {
          const items = await models["User"].count({ nombre });
          return items < 1;
        },
      },
    },
    email: {
      type: String,
      required: [true, "Debes agregar un email"],
      validate: {
        message: "El email ya esta en uso",
        validator: async (email) => {
          const items = await models["User"].count({ email });
          return items < 1;
        },
      },
    },
    password: {
      type: String,
      required: [true, "Debes agregar una contraseña"],
    },
    rol: {
      type: String,
      enum: ["Admin", "Cliente", "Vendedor"],
      default: "Cliente",
    },
    celular: {
      type: Number,
      min: 10,
    },
    comentarios: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
