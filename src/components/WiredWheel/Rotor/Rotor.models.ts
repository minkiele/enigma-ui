import type { RotorType } from "../../../models";
import type { BaseRotorProps } from "../components/BaseRotor/BaseRotor.models";

export interface RotorProps extends Omit<BaseRotorProps<RotorType>, 'children'> {
    usedRotors: Array<RotorType>;
}
