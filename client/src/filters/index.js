//Show Unknown if the value is null
export function nullFormatter(value) {
  if (value === null) return "Unknown";
  else return value;
}
