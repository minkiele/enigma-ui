import { type FC } from "react";
import type { ReflectorProps } from "./Reflector.models";
import { reflectorTypes } from "./Reflector.utils";
import BaseReflector from "../components/BaseReflector/BaseReflector";

const Reflector: FC<ReflectorProps> = (props) => (
  <BaseReflector {...props} options={reflectorTypes} />
);

export default Reflector;
