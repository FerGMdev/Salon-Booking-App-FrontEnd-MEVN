export const formatPrice = (price) => {
  return Number(price).toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};
