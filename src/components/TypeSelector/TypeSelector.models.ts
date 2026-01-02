import type { ChangeEvent } from "react";
import type { EnigmaType } from "../../models";

export interface TypeSelectorProps {
  type: EnigmaType;
  onChangeType: (evt: ChangeEvent<HTMLSelectElement>, type: EnigmaType) => void;
}
