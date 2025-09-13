import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { router } from "./app/router/Routes.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    </QueryClientProvider>
  </StrictMode>
);
