import type { SwapperLabelProps } from "./SwapperLabel.models";
import type { FC } from "react";
import { Badge } from "react-bootstrap";

const SwapperLabel: FC<SwapperLabelProps> = ({ wiring }) => (
  <strong aria-label={`${wiring[0]} swaps with ${wiring[1]}`}>
    {wiring[0]} &hArr; {wiring[1]}
  </strong>
);

export const UhrSwapperLabel: FC<SwapperLabelProps> = ({ wiring, index }) => (
  <div
    aria-label={`Plug ${index}-red connected to ${wiring[0]} and plug ${index}-black connected to ${wiring[1]}`}
  >
    <Badge bg="danger">
      {index}: {wiring[0]}
    </Badge>{" "}
    -{" "}
    <Badge bg="dark">
      {index}: {wiring[1]}
    </Badge>
  </div>
);

export default SwapperLabel;
