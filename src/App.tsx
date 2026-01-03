import type { FC } from "react";
import { Container } from "react-bootstrap";
import Enigma from "./components/Enigma/Enigma";

const App: FC = () => (
  <Container>
    <h1>EnigmaUI</h1>
    <p>
      It was 2016 when I wrote the first version of EnigmaUI. It was a different
      React, a different decade, I had a different job.
    </p>
    <Enigma />
  </Container>
);

export default App;
