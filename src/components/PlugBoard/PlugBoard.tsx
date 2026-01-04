import Swapper from "../Swapper/Swapper";
import type { PlugBoardProps } from "./PlugBoard.models";
import { type FC } from "react";

export const PLUGBOARD_MAX_SIZE = 10;

const PlugBoard: FC<PlugBoardProps> = (props) => (
  <Swapper {...props} limit={PLUGBOARD_MAX_SIZE} />
);

export default PlugBoard;
