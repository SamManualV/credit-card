type CardName = "Visa" | "Master Card" | "American Express" | "Discover" | "JCB";
type Card = { label: CardName; image: string };

type CardType = {
  name: string;
  length: string;
  prefixes: string;
  checkdigit: boolean;
};

export type { Card, CardName, CardType };
