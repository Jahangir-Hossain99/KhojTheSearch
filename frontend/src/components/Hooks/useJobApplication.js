import {useState , useEffect} from 'react';
import axios from 'axios';

export const useJobApplication = (jobData, userData) => {
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        if (!jobData?._id || !userData?._id || checked) return;

        const fetchData = async () => {
            if (!jobData?.companyId) return;

            try {
                setLoading(true);
                const companyResposne = await axios.get(`http://localhost:5000/users/companyDetails/${jobData.companyId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                });
                const applicationResponse = await axios.get(`http://localhost:5000/users/checkApplication/${jobData._id}/${userData._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                });
                setCompanyDetails(companyResposne.data.companyDetails);
                setIsApplied(applicationResponse.data.isApplied); 
                setLoading(false);  
                setChecked(true);
            } catch (error) {
                console.error("Error fetching job application data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [jobData?._id, userData?._id, jobData?.companyId]);
    return { setIsApplied,isApplied, loading, companyDetails };
}