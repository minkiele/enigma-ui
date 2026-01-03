import type { FC } from "react";
import type { PlugBoardWiringProps } from "./PlugboardWiring.models";
import { Button } from "react-bootstrap";

const PlugBoardWiring: FC<PlugBoardWiringProps> = ({
  wiring,
  onRemoveWiring,
}) => (
  <div className="enigmaPlugBoardWiring d-flex align-items-center">
    <strong aria-label={`${wiring[0]} will exchange with ${wiring[1]}`}>
      {" "}
      {wiring[0]} &hArr; {wiring[1]}{" "}
    </strong>
    <div className="ms-auto">
      <Button
        variant="danger"
        onClick={(evt) => {
          onRemoveWiring(evt, wiring);
        }}
      >
        Remove
      </Button>
    </div>
  </div>
);

export default PlugBoardWiring;
