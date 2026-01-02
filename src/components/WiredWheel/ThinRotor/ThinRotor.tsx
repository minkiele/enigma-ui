import { type FC } from "react";
import type { ThinRotorProps } from "./ThinRotor.models";
import BaseRotor from "../components/BaseRotor/BaseRotor";
import type { ThinRotorType } from "../../../models";

const ThinRotor: FC<ThinRotorProps> = (props) => (
  <BaseRotor {...props}>
    {(["Beta", "Gamma"] satisfies Array<ThinRotorType>).map((rotorType) => (
      <option key={rotorType} value={rotorType}>
        {rotorType}
      </option>
    ))}
  </BaseRotor>
);

export default ThinRotor;
