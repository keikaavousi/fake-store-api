import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from '../contexts/RouterContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signup(formData);
      navigate('/');
    } catch (signupError) {
      setError(signupError.message);
    }
  };

  return (
    <main className="auth-page page-shell">
      <section className="auth-intro warm">
        <p className="eyebrow">Join Brad's Store</p>
        <h1>A quieter way<br />to discover more.</h1>
        <p>Create a demo account for a more personal storefront experience.</p>
        <div className="auth-monogram">+</div>
      </section>
      <form className="auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Your account</p>
        <h2>Create an account</h2>
        <p className="form-note">No payment data is collected. Account details stay in this browser.</p>
        {error && <div className="inline-error" role="alert">{error}</div>}
        <div className="field-grid">
          <label>First name<input name="firstName" value={formData.firstName} onChange={handleChange} required /></label>
          <label>Last name<input name="lastName" value={formData.lastName} onChange={handleChange} /></label>
          <label className="wide">Email address<input name="email" type="email" value={formData.email} onChange={handleChange} required /></label>
          <label className="wide">Password<input name="password" type="password" minLength="6" value={formData.password} onChange={handleChange} required /></label>
        </div>
        <button className="primary-button full-width" type="submit">Create account</button>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </main>
  );
}
