import type { EnigmaType } from "../../models";
import type { ChangeEvent } from "react";

export interface TypeSelectorProps {
  type: EnigmaType;
  onChangeType: (evt: ChangeEvent<HTMLSelectElement>, type: EnigmaType) => void;
}
