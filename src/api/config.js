export const APIroutes = {
  registerRoute: "/api/v1/users/register",
  loginRoute: "/api/v1/users/login",
  logout:"/api/v1/users/logout",
  messageRoute:'api/v1/messages'
};

export const BaseURL = 'http://localhost:5001'

export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };
  
