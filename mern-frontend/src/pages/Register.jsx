import { useState, useContext } from "react";
import { registerUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-950 px-4">
  {/* Registration Form */}
  <form 
    onSubmit={handleSubmit} 
    className="bg-gray-800 p-8 rounded-t-xl shadow-2xl w-full max-w-sm text-white border-b border-gray-700"
  >
    <h2 className="text-3xl font-extrabold mb-6 text-center tracking-tight text-blue-400">Register</h2>
    
    <div className="space-y-4">
      <input 
        name="name" 
        type="text"
        placeholder="Full Name" 
        onChange={handleChange} 
        className="w-full p-3 rounded-lg text-black bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500" 
      />
      
      <input 
        name="email" 
        type="email" 
        placeholder="Email Address" 
        onChange={handleChange} 
        className="w-full p-3 rounded-lg text-black bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500" 
      />
      
      <input 
        name="password" 
        type="password" 
        placeholder="Create Password" 
        onChange={handleChange} 
        className="w-full p-3 rounded-lg text-black bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500" 
      />
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all p-3 rounded-lg font-bold text-lg mt-2 shadow-lg"
      >
        Create Account
      </button>
    </div>
  </form>

  {/* Separate Footer (Outside the form tag) */}
  <div className="bg-gray-800/50 w-full max-w-sm p-5 rounded-b-xl text-center shadow-2xl">
    <p className="text-gray-400 text-sm">
      Already have an account?{' '}
      <button 
        type="button" 
        onClick={() => navigate("/")} 
        className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-colors ml-1"
      >
        Sign In
      </button>
    </p>
  </div>
</div>

  );
}
      
export default Register;