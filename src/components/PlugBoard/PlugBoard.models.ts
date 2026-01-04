import type { PlugBoardWiring } from "../Enigma/Enigma.models";
import type { SwapperProps } from "../Swapper/Swapper.models";

export type PlugBoardProps = Omit<SwapperProps<PlugBoardWiring>, "forbidden">;
