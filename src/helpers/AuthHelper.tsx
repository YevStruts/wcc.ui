export const SignIn = (code: string, id: string, username: string, avatar: string) => {
    localStorage.setItem("token", code);
    localStorage.setItem("userId", id);
    localStorage.setItem("username", username);
    localStorage.setItem("user_avatar", avatar);
};

export const SignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
};

export const GetToken = () => {
    return localStorage.getItem("token");
};

interface AuthData {
    token: string | null;
    id: string | null;
    username: string | null;
    avatar: string | null;
}

export const GetAuthData = (): AuthData => {
    return {
        token: localStorage.getItem("token"),
        id: localStorage.getItem("userId"),
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("user_avatar"),
    };
};
