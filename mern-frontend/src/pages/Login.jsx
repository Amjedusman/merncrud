import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { login } = useContext(AuthContext);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      login(data);
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }

    
  };

  return (
  <>
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded w-80 text-white">
        <h2 className="text-2xl mb-4">Login</h2>

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 text-black" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-2 text-black" />

        <button className="w-full bg-green-500 p-2">Login</button>
      </form>
    </div>
      {user ? <button onClick={logout}>Logout {user.name}</button> : <p>Please Login</p>}
    </>
  );
};

export default Login;