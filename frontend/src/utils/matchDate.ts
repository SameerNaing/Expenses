/**
 * Returns true if two given date matchs
 */
function matchDate(a: string, b: string): boolean {
  const d1 = new Date(a);
  const d2 = new Date(b);

  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

export default matchDate;
