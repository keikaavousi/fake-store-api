import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, useRoute } from '../contexts/RouterContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useRoute();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(location.state?.from || '/');
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <main className="auth-page page-shell">
      <section className="auth-intro">
        <p className="eyebrow">Welcome back</p>
        <h1>Your good things,<br />all in one place.</h1>
        <p>Sign in to keep your details close and move through checkout a little faster.</p>
        <div className="auth-monogram">B</div>
      </section>
      <form className="auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Your account</p>
        <h2>Sign in</h2>
        <p className="form-note">This portfolio demo stores only your display details in this browser.</p>
        {error && <div className="inline-error" role="alert">{error}</div>}
        <label>
          Email address
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button className="primary-button full-width" type="submit">Sign in</button>
        <p>New here? <Link to="/signup">Create an account</Link></p>
      </form>
    </main>
  );
}
