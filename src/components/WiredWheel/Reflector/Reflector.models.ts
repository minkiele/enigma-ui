import type { ReflectorType } from "../../../models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export type ReflectorProps = Omit<BaseReflectorProps<ReflectorType>, "options">;
