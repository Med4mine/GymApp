import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import AddMember from "./Pages/AddMember";
import GetMember from "./Pages/GetMember";
import GetEndedMember from "./Pages/GetEndedSubscription";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<AdminDashboard />}></Route>
        <Route path="/add_member" element={<AddMember />}></Route>
        <Route path="/get_member" element={<GetMember />}></Route>
        <Route path="/get_ended_member" element={<GetEndedMember />}></Route>
      </Routes>
    </>
  );
}

export default App;
