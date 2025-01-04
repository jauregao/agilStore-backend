function removeAccentsAndSpecialChars(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c");
}

export default removeAccentsAndSpecialChars;
