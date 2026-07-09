import PrimeNotes from "../../notes/Prime.md";
import type { ExchangeSettings } from "../Enigma/Enigma.models";
import type { MouseEvent, MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

export interface PrimerProps {
  onPrime?: (
    evt: MouseEvent<HTMLButtonElement>,
    state: ExchangeSettings,
  ) => void;
}

export default function Primer({ onPrime }: PrimerProps) {
  const handlePrime: MouseEventHandler<HTMLButtonElement> = async (evt) => {
    const { prime } = await import("./Primer.utils");
    onPrime?.(evt, prime());
  };
  return (
    <>
      <PrimeNotes />
      <div className="d-grid d-md-block">
        <Button type="button" onClick={handlePrime}>
          Prime
        </Button>
      </div>
    </>
  );
}
