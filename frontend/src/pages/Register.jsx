  import { useNavigate } from "react-router-dom";
  import UserRegsiter from "../components/Register/UserRegister";
  import axios from "axios";
  import toast from "react-hot-toast";

  const Register = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
      navigate(-1);
    }

    const handleSubmit = async (completeData) => {
      try {
        await axios.post('http://localhost:5000/users/register', completeData);
        console.log("API Success! Attempting toast...");
        toast.success("Registration successful! Please login.",{ duration: 2000 });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        const message = error.response?.data?.message || "Registration failed. Please try again.";
        toast.error(message);
      }
    };

      return (
      <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20">
        <UserRegsiter handleCancel={handleCancel} handleSubmit={handleSubmit} />
      </div>
    );
  }

  export default Register;