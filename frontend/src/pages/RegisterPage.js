import React, { useState } from 'react';
import Register from '../components/auth/Register';

function RegisterPage() {
    const [registrationStatus, setRegistrationStatus] = useState(null);

    const handleRegistration = (data) => {
        if (data.message === 'Registration successful') {
            setRegistrationStatus('success');
        } else {
            setRegistrationStatus('failure');
        }
    };

    return (
        <div>
            {registrationStatus === 'success' && <div>Registration successful! You can now log in.</div>}
            {registrationStatus === 'failure' && <div>Registration failed. Please try again.</div>}
            <Register onRegister={handleRegistration} />
        </div>
    );
}

export default RegisterPage;
