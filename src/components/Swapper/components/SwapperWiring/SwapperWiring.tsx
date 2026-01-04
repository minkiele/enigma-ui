import type { Wiring } from "../../../Enigma/Enigma.models";
import type { SwapperWiringProps } from "./SwapperWiring.models";
import type { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

const SwapperWiring = <T extends Wiring>({
  wiring,
  disabled,
  onRemoveWiring,
}: SwapperWiringProps<T>) => {
  const handleRemoveWiring: MouseEventHandler<HTMLButtonElement> = (evt) => {
    onRemoveWiring(evt, wiring);
  };
  return (
    <div className="d-flex align-items-center">
      <strong aria-label={`${wiring[0]} swaps with ${wiring[1]}`}>
        {" "}
        {wiring[0]} &hArr; {wiring[1]}{" "}
      </strong>
      <div className="ms-auto">
        <Button
          variant="danger"
          onClick={handleRemoveWiring}
          disabled={disabled}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default SwapperWiring;
