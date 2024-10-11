import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from './redux/slices/authSlice';
import { setUser } from './redux/slices/userSlice';
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import { isTokenExpired, getTokenFromLocalStorage } from './utils/tokenUtils';

function App() {
    const { isAuthenticated, isLoading, user, logout: authLogout } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        if (token) {
            // Token süresini kontrol et
            if (isTokenExpired(token)) {
                dispatch(logout()); // Süresi dolmuşsa çıkış yap
                authLogout({ logoutParams: { returnTo: window.location.origin } });
            } else {
                // Token süresi dolmamışsa kullanıcı bilgilerini ayarla
                const expiration = JSON.parse(atob(token.split('.')[1])).exp;
                dispatch(loginSuccess({ token, expiration }));

                // Eğer user undefined ise boş bir nesne ile kullanıcı bilgilerini ayarlıyoruz
                dispatch(setUser({ token, userInfo: user || {} }));
            }
        }
    }, [isAuthenticated, dispatch, authLogout, user]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="App">
            <h1>Interview App</h1>
            {!isAuthenticated ? <Login /> : <UserProfile />}
        </div>
    );
}

export default App;
