import { createElement, type FC } from "react";
import type { ThinReflectorProps } from "./ThinReflector.models";
import { renderThinReflectorTypes } from "./ThinReflector.utils";
import BaseReflector from "../components/BaseReflector/BaseReflector";

const ThinReflector: FC<ThinReflectorProps> = (props) =>
  createElement(
    BaseReflector,
    { ...props, children: undefined },
    renderThinReflectorTypes
  );

export default ThinReflector;
