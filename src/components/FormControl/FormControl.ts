import { FORM_CONTROL_SIZE } from "./FormControl.utils";
import { createElement, forwardRef } from "react";
import {
  FormSelect as BaseFormSelect,
  FormControl as BaseFormControl,
  type FormControlProps,
  type FormSelectProps,
  type InputGroupProps,
  InputGroup as BaseInputGroup,
  type ButtonProps,
  Button as BaseButton,
} from "react-bootstrap";

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ size, ...props }, forwardedRef) =>
    createElement(BaseFormSelect, {
      ...props,
      ref: forwardedRef,
      size: size ?? FORM_CONTROL_SIZE,
    }),
);

FormSelect.displayName = "Form.Select";

export const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  ({ size, ...props }, forwardedRef) =>
    createElement(BaseFormControl, {
      ...props,
      ref: forwardedRef,
      size: size ?? FORM_CONTROL_SIZE,
    }),
);

FormControl.displayName = "Form.Control";

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ size, ...props }, forwardedRef) =>
    createElement(BaseInputGroup, {
      ...props,
      ref: forwardedRef,
      size: size ?? FORM_CONTROL_SIZE,
    }),
);

InputGroup.displayName = "InputGroup";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, ...props }, forwardedRef) =>
    createElement(BaseButton, {
      ...props,
      ref: forwardedRef,
      size: size ?? FORM_CONTROL_SIZE,
    }),
);

Button.displayName = "Button";
