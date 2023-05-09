import useRXjs from "../hooks/useRXjs";
import { $user } from "../states/user";

const Profile = () => {
const user = useRXjs($user)

    return (<><div style={{ width: "100%", display: "flex", justifyContent: "center"}}><h1>Welcome back, {user.profile.firstName}!</h1></div></>  );
}
 
export default Profile;