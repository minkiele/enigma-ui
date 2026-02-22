import classNames from "classnames";
import {
  createElement,
  Fragment,
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

const UnwrapP: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  ...props
}) =>
  createElement(Fragment, {
    ...props,
  });
