import { FC } from "react";
import styles from "./addCreditCard.module.css";
import { stripeCards } from "./utils";

type CardImageProps = {
  cardName: string;
};

const CardImage: FC<CardImageProps> = ({ cardName }) => {
  return (
    <img
      className={styles.CCImage}
      loading="lazy"
      width="60"
      height="37"
      src={stripeCards.find((card) => card.label === cardName)?.image}
      alt=""
      style={{ marginBottom: 9, marginLeft: 10 }}
    />
  );
};

export default CardImage;
