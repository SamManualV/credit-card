import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "./addCreditCard.module.css";
import { stripeCards } from "./utils";
import CardImage from "./CardImage";
import Show from "../Show";
import RenderOption from "./ReanderOption";
import { Card } from "../../hooks/types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useCreditcard from "../../hooks/useCreditCard";

type CardData = {
  cardName?: string;
  cardNumber?: string;
  fullName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cvc?: number;
};

const AddCreditCard = () => {
  const [cardData, setCardData] = useState<CardData>({});
  const [ccError, setCcError] = useState<string>("");
  const { validateCreditCard } = useCreditcard();
  const theme = useTheme();
  const isScreenSM = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeCard = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCardData({
      ...cardData,
      [event.target.name]: value,
    });
  };

  const handleSelectCard = (props: SyntheticEvent<Element, Event>, newValue: Card | null) => {
    if (!newValue) {
      setCardData({ ...cardData, cardName: "", cardNumber: "" });
      return;
    }
    setCardData({ ...cardData, cardName: newValue?.label || "", cardNumber: "" });

    setCcError("No card number provided");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ccError) {
      console.log(cardData);
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label style={{ color: "#6b7c93", letterSpacing: "0.025em" }}>
          Full Name
          <input
            type="text"
            name="fullName"
            required
            placeholder="First and last name"
            className={styles.CCInput}
            style={{ width: "-webkit-fill-available" }}
            onChange={handleChangeCard}
          />
        </label>
        <label style={{ color: "#6b7c93", letterSpacing: "0.025em" }}>
          Select A Card
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Autocomplete
              className={styles.CCSelect}
              id="ccard-select"
              sx={{
                width: "-webkit-fill-available",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiOutlinedInput-root": {
                  padding: "0px 4px 0px 5px",
                },
                "& .MuiAutocomplete-inputRoot": {
                  color: "#757575",
                },
              }}
              onChange={handleSelectCard}
              options={stripeCards}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => <RenderOption props={props} option={option} />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  placeholder="Ex: Visa"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <Show when={(cardData.cardName?.length ?? 0) > 0}>
              <CardImage cardName={cardData.cardName ?? ""} />
            </Show>
          </div>
        </label>
        <label style={{ color: "#6b7c93", letterSpacing: "0.025em" }}>
          Card Number
          <input
            type="number"
            name="cardNumber"
            min={1}
            className={styles.CCInput}
            value={(cardData.cardName?.length ?? 0) > 0 ? cardData.cardNumber : ""}
            style={{ width: "-webkit-fill-available" }}
            placeholder="1234 1234 1234 1234"
            onChange={(e) => {
              handleChangeCard(e);
              const msg = validateCreditCard({
                // @ts-ignore
                cardName: cardData.cardName,
                cardnumber: e.target.value,
              });
              if (msg !== "VALID") {
                setCcError(msg);
              } else {
                setCcError("");
              }
            }}
            disabled={(cardData.cardName?.length ?? 0) < 1}
          />
          <Typography variant="subtitle2" color="#f44336" marginTop={-2}>
            {ccError && ccError}
          </Typography>
        </label>
        <div className={isScreenSM ? styles.CCColumn : styles.CCFlex}>
          <label style={{ color: "#6b7c93", letterSpacing: "0.025em" }}>
            Expiry Month
            <input
              type="number"
              name="expiryMonth"
              required
              className={styles.CCInput}
              // @ts-ignore
              min={cardData.expiryYear === dayjs().format("YYYY") ? dayjs().format("MM") : 1}
              max={12}
              style={{ width: "-webkit-fill-available" }}
              placeholder="MM"
              onChange={handleChangeCard}
            />
          </label>
          <label style={{ color: "#6b7c93", letterSpacing: "0.025em" }}>
            Expiry Year
            <input
              type="number"
              name="expiryYear"
              required
              className={styles.CCInput}
              min={dayjs().format("YYYY")}
              // @ts-ignore
              onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
              style={{ width: "-webkit-fill-available" }}
              placeholder="YYYY"
              onChange={handleChangeCard}
            />
          </label>
          <label style={{ color: "#6b7c93", letterSpacing: "0.025em" }}>
            CVC
            <input
              type="number"
              name="cvc"
              required
              className={styles.CCInput}
              // @ts-ignore
              onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
              maxLength={4}
              min={1}
              style={{ width: "-webkit-fill-available" }}
              placeholder="CVC"
              onChange={handleChangeCard}
            />
          </label>
        </div>
        <Button fullWidth type="submit">
          SUBMIT
        </Button>
      </div>
    </form>
  );
};

export default AddCreditCard;
