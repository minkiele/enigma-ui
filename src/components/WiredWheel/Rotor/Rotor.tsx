import BaseRotor from "../components/BaseRotor/BaseRotor";
import type { RotorProps } from "./Rotor.models";
import { rotorTypes } from "./Rotor.utils";
import { useMemo, type FC } from "react";

const Rotor: FC<RotorProps> = ({ usedRotors, ...props }) => {
  const options = useMemo(
    () =>
      rotorTypes.map((option) => ({
        ...option,
        disabled: usedRotors.includes(option.value),
      })),
    [usedRotors],
  );
  return <BaseRotor {...props} options={options} />;
};

export default Rotor;
