export function luckyDiscount() {
  const roll = Math.random();
  if (roll < 0.1) return 10;
  if (roll < 0.3) return 5;
  return 0;
}
// TDD challenge: students implement loyaltyPoints in an isolated practice branch.
