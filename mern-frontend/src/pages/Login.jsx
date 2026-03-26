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
    <div className="flex flex-col justify-center items-center h-screen bg-gray-950 px-4">
  {/* The Main Login Form */}
  <form 
    onSubmit={handleSubmit} 
    className="bg-gray-800 p-8 rounded-t-xl shadow-2xl w-full max-w-sm text-white border-b border-gray-700"
  >
    <h2 className="text-3xl font-extrabold mb-6 text-center tracking-tight">Login</h2>
    
    <div className="space-y-4">
      <input 
        name="email" 
        type="email" 
        placeholder="Email Address" 
        onChange={handleChange} 
        className="w-full p-3 rounded-lg text-black bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
      />
      
      <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        onChange={handleChange} 
        className="w-full p-3 rounded-lg text-black bg-gray-100 outline-none focus:ring-2 focus:ring-green-500 transition-all" 
      />
      
      <button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-500 active:scale-[0.98] transition-all p-3 rounded-lg font-bold text-lg mt-2 shadow-lg"
      >
        Sign In
      </button>
    </div>
  </form>

  {/* Separate Footer Container (Outside the form tag) */}
  <div className="bg-gray-800/50 w-full max-w-sm p-5 rounded-b-xl text-center shadow-2xl">
    <p className="text-gray-400 text-sm">
      Don't have an account?{' '}
      <button 
        type="button" 
        onClick={() => navigate("/register")} 
        className="text-green-400 font-semibold hover:text-green-300 hover:underline transition-colors ml-1"
      >
        Register now
      </button>
    </p>
  </div>
</div>

      {user ? <button onClick={logout}>Logout {user.name}</button> : <p>Please Login</p>}
    </>
  );
};

export default Login;