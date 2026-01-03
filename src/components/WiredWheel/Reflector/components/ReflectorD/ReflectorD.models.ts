import type { ReflectorWiring } from "../../../../Enigma/Enigma.models";
import type { SwapperProps } from "../../../../Swapper/Swapper.models";


export type ReflectorDProps = Omit<SwapperProps<ReflectorWiring>, 'limit'>;
