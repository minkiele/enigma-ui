import type { ThinRotorType } from "../../../models";
import type { BaseRotorProps } from "../components/BaseRotor/BaseRotor.models";

export type ThinRotorProps = Omit<BaseRotorProps<ThinRotorType>, "options">;
