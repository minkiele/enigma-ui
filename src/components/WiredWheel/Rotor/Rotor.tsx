import { useMemo, type FC } from "react";
import type { RotorProps } from "./Rotor.models";
import BaseRotor from "../components/BaseRotor/BaseRotor";
import type { RotorType } from "../../../models";

const Rotor: FC<RotorProps> = ({ usedRotors, ...props }) => {
  const choices = useMemo(
    () =>
      (
        [
          "I",
          "II",
          "III",
          "IV",
          "V",
          "VI",
          "VII",
          "VIII",
        ] satisfies Array<RotorType>
      ).map((rotorType) => (
        <option
          key={rotorType}
          value={rotorType}
          disabled={usedRotors.includes(rotorType)}
        >
          {rotorType}
        </option>
      )),
    [usedRotors]
  );
  return <BaseRotor {...props}>{choices}</BaseRotor>;
};

export default Rotor;
