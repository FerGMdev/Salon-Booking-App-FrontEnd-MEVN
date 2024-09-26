import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      global: {
        wrapper: "mb-6 mt-2",
        label: "text-gray-300", // Color claro para el label
        help: "text-gray-400", // Color claro para el help
        message: "text-red-700 bg-red-100 p-2 rounded-md font-bold", // Texto rojo con fondo rojo claro
        input:
          "border border-gray-600 rounded-md p-2 w-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500", // Sutil outline gris oscuro
      },
      submit: {
        wrapper: "mt-6",
        input:
          "bg-sky-600 hover:bg-sky-500 text-white p-2 rounded-md transition duration-200", // Color de fondo del botón
      },
    }),
  },
};

export default config;
