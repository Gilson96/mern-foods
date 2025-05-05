import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
