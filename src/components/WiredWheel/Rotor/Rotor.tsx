import { useMemo, type FC } from "react";
import type { RotorProps } from "./Rotor.models";
import BaseRotor from "../components/BaseRotor/BaseRotor";
import { rotorTypes } from "./Rotor.utils";

const Rotor: FC<RotorProps> = ({ usedRotors, ...props }) => {
  const options = useMemo(
    () =>
      rotorTypes.map((option) => ({
        ...option,
        disabled: usedRotors.includes(option.value),
      })),
    [usedRotors]
  );
  return <BaseRotor {...props} options={options} />;
};

export default Rotor;
