import { parse, formatISO, parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

export function convertToISO(strDate) {
  const parsedDate = parse(strDate, "dd/MM/yyyy", new Date());
  return formatISO(parsedDate);
}

export function displayDate(date) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "PPPP", { locale: es });
  return formattedDate;
}

export function convertToDDMMYYYY(date) {
  const newDate = parseISO(date);
  const formattedDate = format(newDate, "dd/MM/yyyy", { locale: es });
  return formattedDate;
}
