import type { ThinReflectorType } from "../../../models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export type ThinReflectorProps = Omit<BaseReflectorProps<ThinReflectorType>, 'options'>;
