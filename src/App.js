import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PostsPage from "./pages/PostsPage";

const privatRouter = createBrowserRouter([
  {
    path: "*",
    element: <PostsPage />,
  },
]);

const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <SignInPage />,
  },
]);

function App() {
  if (!localStorage.getItem("token")) {
    return <RouterProvider router={router} />;
  }

  return <RouterProvider router={privatRouter} />;
}

export default App;
