import logo from './logo.svg';
import { useState } from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import PageLogin from './Page/PageLogin.js'
import PageRegister from './Page/PageRegister'
import PageHome from './Page/PageHome';
import { auth } from './Config/firebase'
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children, isBypas = false }) {
  let location = useLocation();
  const [view, setView] = useState(<div>loading</div>)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const uid = user.uid;
      setView(children)
    } else {
      console.log(location.pathname);
      if (location.pathname === '/login' || location.pathname === '/register') {

      } else {
        console.log('test');
        if (location.pathname != '/login') {
          setView(<Navigate to="/login" />)
        }
      }
    }
  });

  return view
}

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isBypas={false} >
              <PageHome />
            </ProtectedRoute>
          } />
          <Route path="login" element={
            <PageLogin />
          } />
          <Route path="register" element={
            <PageRegister />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
