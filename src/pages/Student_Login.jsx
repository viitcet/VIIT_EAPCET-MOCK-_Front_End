import { useState,} from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Student_Login() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(role !== "student" && role !== "admin" && role !== "teacher") {
      setError("Please select a valid role.");
      setLoading(false);
      return;
    }
    setError("");
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const result = await response.json(); 
      if (!response.ok) {
        throw new Error(
          result.message || "Login failed. Invalid credentials or server error."
        );
      }
      localStorage.setItem("studentId",result.user.id);
      localStorage.setItem("name",result.user.fullName);
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.user.role);
      if(role === "student") {  
        navigate("/student_dashboard");
      } else {
        navigate("/Admin-Pages/teacherdashboard");
      }
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
        {
            loading && <Loader/>
        }
      <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative z-10 font-poppins">    
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">
                        Mock AP EAPCET Login Form          
          </h2>
                   
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded-md p-3 mb-4 text-sm text-center">
                            {error}           
            </div>
          )}
                   
          <form onSubmit={handleSubmit} className="space-y-4">
                       
            <div>
                           
              <label className="block font-medium mb-1 text-black">
                                Username:              
              </label>
                           
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#EFF7FF] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#003973] outline-none shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              />
                         
            </div>
                       
            <div>
                           
              <label className="block font-medium mb-1 text-black">
                                Password:              
              </label>
                           
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#EFF7FF] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#003973] outline-none shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              />
                         
            </div>
                 
            <div>
                           
              <label className="block font-medium mb-1 text-black">Role:</label>
                           
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                }}
                className="w-full bg-[#EFF7FF] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#003973] outline-none shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              >
                <option value="">Select Role</option>               
                <option value="student">Student</option>               
                <option value="admin">Admin</option>               
                <option value="teacher">Teacher</option>             
              </select>
                         
            </div>
                       
            <div className="flex justify-center mt-6">
                   
              <button
                type="submit"
                disabled={loading}
                className={`text-white px-6 py-2 rounded-md shadow-md transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#003973] hover:bg-[#002952]"
                }`}
              >
                      {loading ? "Logging In..." : "SUBMIT"}             
              </button>
                         
            </div>
                       
            <div className="flex justify-center mt-4">
                           
              <span
                onClick={() => navigate("/")}
                className="text-[#003973] font-medium cursor-pointer hover:text-[#002952] transition-colors duration-300 underline-offset-2 hover:underline"
              >
                                Back to Home              
              </span>
                         
            </div>
                     
          </form>
                 
        </div>
             
      </div>
            <Footer />   
    </>
  );
}

export default Student_Login;