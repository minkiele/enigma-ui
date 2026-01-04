import BaseRotor from "../components/BaseRotor/BaseRotor";
import type { ThinRotorProps } from "./ThinRotor.models";
import { rotorTypes } from "./ThinRotor.utils";
import { type FC } from "react";

const ThinRotor: FC<ThinRotorProps> = (props) => (
  <BaseRotor {...props} options={rotorTypes} />
);

export default ThinRotor;
