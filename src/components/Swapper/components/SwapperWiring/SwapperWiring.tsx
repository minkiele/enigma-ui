import type { Wiring } from "../../../Enigma/Enigma.models";
import SwapperLabel from "../SwapperLabel/SwapperLabel";
import type { SwapperWiringProps } from "./SwapperWiring.models";
import type { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

const SwapperWiring = <T extends Wiring>({
  wiring,
  disabled,
  children,
  onRemoveWiring,
}: SwapperWiringProps<T>) => {
  const handleRemoveWiring: MouseEventHandler<HTMLButtonElement> = (evt) => {
    onRemoveWiring(evt, wiring);
  };
  return (
    <div className="d-flex align-items-center">
      {children || <SwapperLabel wiring={wiring} />}
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
