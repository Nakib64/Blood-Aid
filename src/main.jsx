import { StrictMode } from "react";

import "./index.css";
import AuthProvider from "./Authentication/authProvider.jsx";
import { RouterProvider } from "react-router";
import Routes from "./route/Routes.jsx";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={Routes}></RouterProvider>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
