import Box from "@mui/material/Box";
import { FC, HTMLAttributes } from "react";
import { Card } from "../../hooks/types";

type RenderOptionProps = {
  props: HTMLAttributes<HTMLLIElement>;
  option: Card;
};

const RenderOption: FC<RenderOptionProps> = ({ props, option }) => {
  return (
    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
      <img loading="lazy" width="20" src={option.image} alt="" />
      {option.label}
    </Box>
  );
};

export default RenderOption;
