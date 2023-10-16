import { FC, Fragment, ReactNode } from "react";

type ShowProps = {
  when: boolean;
  children: ReactNode;
  otherwise?: ReactNode; // Optional "otherwise" prop for the ternary operator
};

const Show: FC<ShowProps> = ({ when, children, otherwise = null }) => {
  return <Fragment>{when ? children : otherwise}</Fragment>;
};

export default Show;
