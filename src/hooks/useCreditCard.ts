import { CardType } from "./types";

let ccErrorNo = 0;
const ccErrors: string[] = [
  "Unknown card type",
  "No card number provided",
  "Credit card number is in an invalid format",
  "Credit card number is invalid",
  "Credit card number has an inappropriate number of digits",
  "Warning! This credit card number is associated with a scam attempt",
];

const checkCreditCard = (cardnumber: string, cardname: string): boolean => {
  const cards: CardType[] = [
    { name: "Visa", length: "13,16", prefixes: "4", checkdigit: true },
    { name: "Master Card", length: "16", prefixes: "51,52,53,54,55", checkdigit: true },
    // { name: "DinersClub", length: "14,16", prefixes: "36,38,54,55", checkdigit: true },
    // { name: "CarteBlanche", length: "14", prefixes: "300,301,302,303,304,305", checkdigit: true },
    { name: "American Express", length: "15", prefixes: "34,37", checkdigit: true },
    { name: "Discover", length: "16", prefixes: "6011,622,64,65", checkdigit: true },
    { name: "JCB", length: "16", prefixes: "35", checkdigit: true },
    // { name: "enRoute", length: "15", prefixes: "2014,2149", checkdigit: true },
    // { name: "Solo", length: "16,18,19", prefixes: "6334,6767", checkdigit: true },
    // { name: "Switch", length: "16,18,19", prefixes: "4903,4905,4911,4936,564182,633110,6333,6759", checkdigit: true },
    // { name: "Maestro", length: "12,13,14,15,16,18,19", prefixes: "5018,5020,5038,6304,6759,6761,6762,6763", checkdigit: true },
    // { name: "VisaElectron", length: "16", prefixes: "4026,417500,4508,4844,4913,4917", checkdigit: true },
    // { name: "LaserCard", length: "16,17,18,19", prefixes: "6304,6706,6771,6709", checkdigit: true }
  ];

  let cardType = -1;
  for (let i = 0; i < cards.length; i++) {
    if (cardname.toLowerCase() === cards[i].name.toLowerCase()) {
      cardType = i;
      break;
    }
  }

  if (cardType === -1) {
    ccErrorNo = 0;
    return false;
  }

  if (cardnumber.length === 0) {
    ccErrorNo = 1;
    return false;
  }

  cardnumber = cardnumber.replace(/\s/g, "");

  const cardexp = /^[0-9]{13,19}$/;
  if (!cardexp.test(cardnumber)) {
    ccErrorNo = 2;
    return false;
  }

  if (cards[cardType].checkdigit) {
    let checksum = 0;
    let mychar: string = ""; // eslint-disable-line
    let j = 1;
    let calc: number;

    for (let i = cardnumber.length - 1; i >= 0; i--) {
      calc = Number(cardnumber.charAt(i)) * j;

      if (calc > 9) {
        checksum += 1;
        calc -= 10;
      }

      checksum += calc;

      if (j === 1) {
        j = 2;
      } else {
        j = 1;
      }
    }

    if (checksum % 10 !== 0) {
      ccErrorNo = 3;
      return false;
    }
  }

  if (cardnumber === "5490997771092064") {
    ccErrorNo = 5;
    return false;
  }

  let LengthValid = false;
  let PrefixValid = false;
  let prefix: string[];
  let lengths: string[];

  prefix = cards[cardType].prefixes.split(","); // eslint-disable-line
  for (let i = 0; i < prefix.length; i++) {
    const exp = new RegExp("^" + prefix[i]);
    if (exp.test(cardnumber)) PrefixValid = true;
  }

  if (!PrefixValid) {
    ccErrorNo = 3;
    return false;
  }

  lengths = cards[cardType].length.split(","); // eslint-disable-line
  for (let j = 0; j < lengths.length; j++) {
    if (cardnumber.length === parseInt(lengths[j])) LengthValid = true;
  }

  if (!LengthValid) {
    ccErrorNo = 4;
    return false;
  }

  return true;
};

type ValidateCreditCardProps = { cardnumber: string; cardName: string };
const useCreditcard = () => {
  const validateCreditCard = ({ cardnumber, cardName }: ValidateCreditCardProps) => {
    if (checkCreditCard(cardnumber, cardName)) {
      return "VALID";
    } else {
      return ccErrors[ccErrorNo];
    }
  };

  return {
    validateCreditCard,
  };
};

export default useCreditcard;
