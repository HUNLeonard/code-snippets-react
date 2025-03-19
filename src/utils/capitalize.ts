export const capitalizer = (str: string) => {
  if (str.trim().length === 0) return "";
  return str[0].toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1");
};
