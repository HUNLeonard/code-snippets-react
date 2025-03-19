export const cn = (...args: (string | boolean | undefined | null)[]) => {
  return args
    .map((a) => (typeof a === "boolean" || !a ? "" : a.trim()))
    .join(" ");
};
