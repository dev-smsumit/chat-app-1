import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Registration from "./pages/registration/Registration.jsx";
import Login from "./pages/login/Login.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from "./components/rootLayout/rootLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Chat from "./pages/chat/Chat.jsx";
import Notification from "./pages/notification/Notification.jsx";
import Settings from "./pages/setting/Settings.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<Registration/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/root" element={<RootLayout/>}>
      <Route path="/root/home" element={<Home/>}></Route>
      <Route path="/root/chat" element={<Chat/>}></Route>
      <Route path="/root/notification" element={<Notification/>}></Route>
      <Route path="/root/setting" element={<Settings/>}></Route>
    </Route>
  </Route>
))

function App() {

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
