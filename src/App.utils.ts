import classNames from "classnames";
import {
  createElement,
  type FC,
  type HTMLAttributes,
  type HTMLElementType,
} from "react";

const ReadmeH1: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) =>
  createElement("h1", {
    ...props,
    className: classNames(className, "display-1"),
  });

const ReadmeP: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) =>
  createElement("p", {
    ...props,
    className: classNames(className, "lead"),
  });

export const components: Partial<Record<HTMLElementType, FC>> = {
  h1: ReadmeH1,
  p: ReadmeP,
};
