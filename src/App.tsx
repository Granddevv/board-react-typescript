import "./App.css";
import { AppProvider } from "./context/app.context";
import Navigation from "./navigation";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navigation />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
