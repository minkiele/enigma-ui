import { type FC } from "react";
import type { PlugBoardProps } from "./PlugBoard.models";
import Swapper from "../Swapper/Swapper";

export const PLUGBOARD_MAX_SIZE = 10;

const PlugBoard: FC<PlugBoardProps> = (props) => (
  <Swapper {...props} limit={PLUGBOARD_MAX_SIZE} />
);

export default PlugBoard;
