export const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateCredentials = (email, password) => {
  if (!email || password) return "Missing email or password";
  if (!isValidEmail(email)) return "Invalid email format";
  return null;
};

export const ValidateBio = (bio) => {
  if (typeof bio !== "string") return "Bio must be a text";
  if (bio.length > 300) return "Bio too long. Max words 300";
  return null;
};
