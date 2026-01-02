import { type FC } from "react";
import type { ThinReflectorProps } from "./ThinReflector.models";
import { reflectorTypes } from "./ThinReflector.utils";
import BaseReflector from "../components/BaseReflector/BaseReflector";

const ThinReflector: FC<ThinReflectorProps> = (props) => (
  <BaseReflector {...props} options={reflectorTypes} />
);

export default ThinReflector;
