export const turncate = (text, maxLength) => {
  const result = text.substring(0, maxLength) + ' ...';
  return result;
};

export const firstLetter = text => {
  return text.charAt(0).toUpperCase();
};