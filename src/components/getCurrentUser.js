import { auth } from "../firebase";

export const getCurrentUser = () => {
    const user = auth.currentUser;
    console.log("getCurrentUser User", user.displayName)
    if (!user) return null;
    return user;
}
