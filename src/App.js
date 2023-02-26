import GlobalStyle from "./styles/GlobalStyle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

function Root() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </>
  );
}
