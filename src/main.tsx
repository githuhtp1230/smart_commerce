import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./type/i18n";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={new QueryClient()}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);
