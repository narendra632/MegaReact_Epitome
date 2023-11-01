
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";



// Render the app
// Wrap the app with the QueryProvider and AuthProvider
// The QueryProvider will make the react query client available to all the components in the app
// The AuthProvider will make the auth context available to all the components in the app
// The AuthProvider will also check if the user is authenticated and set the user and isAuthenticated state
// The AuthProvider will also redirect the user to the home page if the user is authenticated

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider> 
            <App/>
        </AuthProvider>  
      </QueryProvider>
        
    </BrowserRouter>
);