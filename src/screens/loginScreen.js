import{useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function LoginScreen(params) {
  const [user, setUser] = useState({});
  const navigate=useNavigate();
  function handleCredentialResponse(res) {
    const userObject = jwt_decode(res.credential);
    localStorage.setItem("usm_user", JSON.stringify(userObject));
    navigate('/home');
  }
  useEffect(()=>{
    if(localStorage.getItem('usm_user')){
        navigate('/home');
    }
  },[])
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "818545194339-u3d39p1tsh64fl0dd9ac28j3cq2q20ru.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outlined", size: "large" } // customization attributes
    );
  }, []);

  return (
    <>
      <div className="loginWrapper">
        <div className="loginHeader">
          User Management System
        </div>
      <div id="signInDiv"></div>
      </div>
      
    </>
  );
}
export default LoginScreen;
