import React, { useState } from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        phone_number: '',
        username: '',
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }
            
            setResult(data);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h1 className="title">Lottery Registration</h1>
                
                {!result ? (
                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={loading ? 'submit-button loading' : 'submit-button'}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                ) : (
                    <div className="success-message">
                        <h2>Registration Successful!</h2>
                        <p>Your lottery number is:</p>
                        <div className="lottery-number">
                            {result.lottery_number}
                        </div>
                        <p className="save-notice">
                            Please save this number for future reference.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegistrationForm;