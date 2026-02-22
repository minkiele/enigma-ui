import { unwrapp } from "../../App.utils";
import ImportNotes from "../../notes/Import.md";
import type { ExchangeSettings } from "../Enigma/Enigma.models";
import type { ImportProps } from "./Import.models";
import {
  useId,
  useState,
  type ChangeEventHandler,
  type FC,
  type MouseEventHandler,
} from "react";
import { Button, Form } from "react-bootstrap";

const Import: FC<ImportProps> = ({ onImport }) => {
  const importId = useId();

  const [imported, setImported] = useState<ExchangeSettings>();

  const handleProvideImport: ChangeEventHandler<HTMLInputElement> = async (
    evt,
  ) => {
    const { validateImportSchema } = await import("../../utils/validate");
    try {
      const input = await evt.target.files?.[0].text();
      if (input) {
        const json = JSON.parse(input);
        if (validateImportSchema(json)) {
          setImported(json);
        } else {
          setImported(undefined);
        }
      } else {
        setImported(undefined);
      }
    } catch {
      setImported(undefined);
    }
  };

  const handleImport: MouseEventHandler<HTMLButtonElement> = (evt) => {
    if (imported != null) {
      onImport(evt, imported);
    }
  };

  return (
    <>
      <ImportNotes />
      <Form.Group controlId={importId} className="mb-3">
        <Form.Label visuallyHidden>Select a file to import</Form.Label>
        <Form.Control type="file" onChange={handleProvideImport} />
      </Form.Group>
      <div className="d-grid d-md-block">
        <Button disabled={imported == null} onClick={handleImport}>
          Import
        </Button>
      </div>
    </>
  );
};

export default Import;
