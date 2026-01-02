import type { PlugBoardProps } from "../../PlugBoard.models";

export type NewPlugBoardWiringProps = Pick<
  PlugBoardProps,
  "onAddWiring" | "wirings"
>;
