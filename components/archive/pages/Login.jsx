import { useState } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth, auth } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/token/", formData); // Adjust the URL to your login endpoint
      console.log("Login successful:", response.data);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      const { access } = response.data;

      const userResponse = await api.get("/doctor/me/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      console.log("User details:", userResponse.data);

      const username = userResponse.data.user.username;
      const email = userResponse.data.user.email;
      const userpic = userResponse.data.userpic;
      const clinic_photos = userResponse.data.clinic_photos;
      const static_text = userResponse.data.static_text;
      const prices = userResponse.data.prices;

      setAuth({
        username,
        email,
        userpic,
        clinic_photos,
        static_text,
        prices,
      });
      navigate("/");
      console.log(auth);
    } catch (error) {
      console.error("There was an error logging in:", error);
    }
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <form onSubmit={handleSubmit}>
        <div className="p-[24px]">
          <div className="py-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="p-2 text-[12px] bg-white block px-4 text-gray-900 rounded-[48px] border border-gray-900"
            />
          </div>
          <div className="py-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-2 text-[12px] bg-white block px-4 text-gray-900 rounded-[48px] border border-gray-900"
            />
          </div>
          <button
            className="bg-black text-white my-2 py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
