import { BrowserRouter, Route, RouterProvider, createBrowserRouter } from "react-router-dom"
import EditorPage from "./Pages/EditorPage"
import HomePage from "./Pages/HomePage"
import Navbar from "./Components/Navbar/Navbar"
// import DnDFlow from "./Page/EditorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: '/editor',
    element: <EditorPage />
  }
])

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <RouterProvider router={router} />
    </>
  )
}

export default App