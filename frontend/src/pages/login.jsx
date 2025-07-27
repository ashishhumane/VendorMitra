import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from '../components/popup'
const baseURL = import.meta.env.VITE_API_baseURL;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [status,setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/user/login`,
        { email, password },
        { withCredentials: true }
      )
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          return res; // optionally return the response
        })
        .catch((err) => {
          console.error("Login failed:", err);
        });
      console.log(response);

      if (response.status === 200) {
        if (response.data.user.role === 'supplier') {
          // setStatus(response.message)
          setErrorMsg(response.data.message)
          navigate("/sdashboard");
        } else {
          navigate("/vdashboard");
        }
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100 flex items-center justify-center p-4">
      {/* <Popup status={status} /> */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-4 border-orange-200">
        <h2 className="text-3xl font-extrabold text-orange-700 text-center mb-6">
          🍵 Welcome Back, Vendor!
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded mb-4 text-center">
            {errorMsg && errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-orange-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={`w-full font-bold py-2 rounded-full transition ${loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-orange-700">
          New to VendorMitra?{" "}
          <Link to="/signup" className="font-bold underline hover:text-pink-600">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
