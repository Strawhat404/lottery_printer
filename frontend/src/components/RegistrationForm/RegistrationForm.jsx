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
            const response = await axios.post('http://localhost:8000/api/register/', formData);
            setResult(response.data);
        } catch (err) {
            setError(
                err.response?.data?.error || 
                err.response?.data?.message || 
                'Registration failed'
            );
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
                                placeholder="Enter your email"
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
                                placeholder="Enter your phone number"
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
                                placeholder="Choose a username"
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