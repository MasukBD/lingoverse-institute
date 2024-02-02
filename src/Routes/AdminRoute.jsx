import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useUserRole from '../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { userRole, userRoleLoading } = useUserRole();
    const location = useLocation();
    if (loading || userRoleLoading) {
        return <div className='h-screen flex items-center justify-center'><Puff visible={true} height="80" width="80" color="#050582" ariaLabel="puff-loading" wrapperStyle={{}} wrapperClass="" /></div>
    }
    if (user && userRole === 'admin') {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }}></Navigate>

};

export default AdminRoute;