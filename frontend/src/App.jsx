import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#111",
        color: "#fff",
        border:
          "1px solid #333",
      },
    }}
  />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;