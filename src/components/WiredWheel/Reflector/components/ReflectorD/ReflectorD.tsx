import { type FC } from "react";
import type { ReflectorDProps } from "./ReflectorD.models";
import Swapper from "../../../../Swapper/Swapper";

const REFLECTOR_D_FORBIDDEN = ["B", "O"];

const ReflectorD: FC<ReflectorDProps> = (props) => (
  <Swapper {...props} forbidden={REFLECTOR_D_FORBIDDEN} />
);

export default ReflectorD;
