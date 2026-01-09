  import { useNavigate } from "react-router-dom";
  import EmployeeRegistration from "../../components/Register/EmployeeRegistration"
  import axios from "axios";
  import toast from "react-hot-toast";

  const CompanyRegister = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
      navigate(-1);
    }

    const handleSubmit = async (companyData) => {
      try {
        const response = await axios.post("http://localhost:5000/company/register", companyData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Company registered successfully!");
        navigate("/company-login" );
      } catch (error) {
        console.error("Error registering company:", error);
        toast.error("Failed to register company. Please try again.");
      }
    }
      return (
      <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20">
        <EmployeeRegistration handleCancel={handleCancel} handleSubmit={handleSubmit} />
      </div>
    );
  }


  export default CompanyRegister;