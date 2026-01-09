import { jwtDecode } from "jwt-decode";

export const getUserData =  async () => {
    const token = localStorage.getItem("authToken");
    if(!token || token !== 'string') return null;
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    try {

  const response = await fetch(`http://localhost:5000/users/profile/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
    const data = await response.json();
    return data;
} catch (error) {
    console.error("Error fetching user data:", error);
    return null;
}
}
