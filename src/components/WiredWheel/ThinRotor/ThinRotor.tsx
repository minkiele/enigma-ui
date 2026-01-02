import { type FC } from "react";
import type { ThinRotorProps } from "./ThinRotor.models";
import BaseRotor from "../components/BaseRotor/BaseRotor";
import { rotorTypes } from "./ThinRotor.utils";

const ThinRotor: FC<ThinRotorProps> = (props) => (
  <BaseRotor {...props} options={rotorTypes} />
);

export default ThinRotor;
