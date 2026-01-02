import type { FC } from "react";
import type { PlugBoardWiringProps } from "./PlugboardWiring.models";
import { Button } from "react-bootstrap";

const PlugBoardWiring: FC<PlugBoardWiringProps> = ({
  wiring,
  onRemoveWiring,
}) => (
  <div className="enigmaPlugBoardWiring clearfix">
    <strong>
      {" "}
      {wiring[0]} &hArr; {wiring[1]}{" "}
    </strong>
    <div className="pull-right">
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
