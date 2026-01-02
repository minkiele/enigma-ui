import type { FC } from "react";
import { Container } from "react-bootstrap";
import Enigma from "./components/Enigma/Enigma";

const App: FC = () => (
  <Container>
    <h1>enigma-ui</h1>
    <p>After 10 years I found the courage to rewrite the interface to the Enigma UI</p>
    <Enigma />
  </Container>
);

export default App;