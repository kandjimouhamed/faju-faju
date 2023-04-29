import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from './components/Signup';
import SignupAdmin from "./components/SignupAdmin";
import Dashboard from './pages/admin/dashboard/Dashboard';
import LoginAdmin from './components/LoginAdmin';
import { Toaster } from "react-hot-toast";
import Page404 from "./components/404";


function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/signup" element={<SignupAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Toaster
        containerStyle={{ bottom: "10%" }}
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
