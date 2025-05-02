//**
//check to makes sure note is a valid number
//  */
export function isValidNoteId(id: any): boolean {
  const num = Number(id);
  return Number.isInteger(num) && num > 0 && !isNaN(num);
}
