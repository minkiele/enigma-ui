import "./styles.scss";
import { lazy, Suspense, type FC } from "react";
import { Container } from "react-bootstrap";

const Enigma = lazy(() => import("./components/Enigma/Enigma"));

const App: FC = () => (
  <Container>
    <h1>enigma-ui</h1>
    <p>
      It was 2016 when I wrote the first version of EnigmaUI. It was a different
      React, a different decade, I had a different job. Over time I integrated
      other features into my implementation of the <em>Enigma machine</em>, like
      the <em>Reflector D</em> and the <em>Uhr</em>. Providing a UI for them was
      starting to be a challenge because I had to rewrite all the code into a
      modern language. Thanks for the '25s Christmas holidays!
    </p>
    <Suspense fallback={<p>Loading Enigma...</p>}>
      <Enigma />
    </Suspense>
  </Container>
);

export default App;
