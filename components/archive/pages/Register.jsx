import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user.username", formData.username);
    data.append("user.password", formData.password);
    data.append("user.email", formData.email);

    try {
      const response = await api.post("/register/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("There was an error registering:", error);
      alert("There was an error registering!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ml-10 bg-white rounded-3xl w-[95%]">
          <div className="p-[24px]">
            <div className="py-3">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="p-2 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
              />
            </div>
            <div className="py-3">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-2 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
              />
            </div>
            <div className="py-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 text-[12px] bg-white active:text-gray-200 block px-4 text-gray-400 rounded-[48px] hover:text-gray-500 border border-gray-900"
              />
            </div>
            <button
              className="bg-black text-white my-2 py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
