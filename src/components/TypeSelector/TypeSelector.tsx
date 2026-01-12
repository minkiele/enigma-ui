import type { EnigmaType } from "../../models";
import { FormSelect } from "../FormControl/FormControl";
import type { TypeSelectorProps } from "./TypeSelector.models";
import { useId, type ChangeEventHandler, type FC } from "react";
import { Form } from "react-bootstrap";

const TypeSelector: FC<TypeSelectorProps> = ({ type, onChangeType }) => {
  const id = useId();
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChangeType(evt, evt.target.value as EnigmaType);
  };
  return (
    <Form.Group controlId={id}>
      <Form.Label>Type</Form.Label>
      <FormSelect value={type} onChange={handleChange}>
        <option value="M3">Enigma M3</option>
        <option value="M4">Enigma M4</option>
      </FormSelect>
    </Form.Group>
  );
};

export default TypeSelector;
