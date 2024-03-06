import { GoogleLogin } from "@react-oauth/google";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import UserDetailContext from "../context/UserDetailContext";
import { useContext } from "react";

function SignInBtn() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserDetailContext);
  const navigate = useNavigate();
  const responseMessage = (response) => {
    const resGet = login(response.credential, response.clientId);
    resGet
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        localStorage.removeItem("token"); //expired or invalid token or server not running
        alert("Token expired please try again!");
        window.location.reload();
        console.log(err);
      });
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div className="googleBtn">
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}
export default SignInBtn;