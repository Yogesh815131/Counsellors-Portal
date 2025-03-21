import React, { useEffect, useState } from 'react';
import Registration from './Registration';
import Dashboard from '../components/Dashboard';
import Login from './Login';
import Navbar from '../components/Navbar';

function Home() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('isLoggedIn');
        const isLogin = sessionStorage.getItem('isLogin') === 'true';
        console.log('isLoggedIn:', loggedInStatus);
        setIsLogin(loggedInStatus);
    }, []);

    return (
        <>

            <div>
                <Navbar />
            </div>
            <div>
                {isLogin ? <Dashboard /> : <Login />}
            </div>
        </>
    );
}

export default Home;
