import { Visa, AmericanExpress, Discover, Jcb, MasterCard } from "../../assets";
import { Card } from "../../hooks/types";

export const stripeCards: Card[] = [
  { label: "Visa", image: Visa },
  { label: "Master Card", image: MasterCard },
  { label: "American Express", image: AmericanExpress },
  { label: "Discover", image: Discover },
  //   { label: "JCB", image: Jcb },
  // { name: "UnionPay", image: ChinaUPay },
];
