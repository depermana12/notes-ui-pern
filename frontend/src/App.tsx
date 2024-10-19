import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRouteLayout from "./layouts/ProtectedRouteLayout";
import SignUp from "./features/auth/SignUp";
import CardForm from "./components/CardForm";
import SignIn from "./features/auth/SignIn";
import { AuthProvider } from "./features/auth/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<CardForm />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRouteLayout />}>
          <Route path="/dashboard" element={<MainLayout />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default App;
