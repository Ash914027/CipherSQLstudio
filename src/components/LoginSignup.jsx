import React, { useState } from 'react';

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock authentication
    if (isLogin) {
      // Simulate login check
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        localStorage.setItem('user', JSON.stringify({ email: formData.email, name: 'Demo User' }));
        onLogin({ email: formData.email, name: 'Demo User' });
      } else {
        setError('Invalid credentials. Use user@example.com / password');
      }
    } else {
      // Simulate signup
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.email.split('@')[0] }));
      onLogin({ email: formData.email, name: formData.email.split('@')[0] });
    }
  };

  return (
    <div className="login-signup">
      <div className="login-signup__container">
        <div className="login-signup__header">
          <h1 className="login-signup__title">
            <span className="login-signup__icon">⚡</span>
            CipherSQLStudio
          </h1>
          <p className="login-signup__subtitle">Master SQL Through Practice</p>
        </div>

        <div className="login-signup__form-container">
          <div className="login-signup__tabs">
            <button
              className={`login-signup__tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`login-signup__tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form className="login-signup__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn--primary login-signup__submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="login-signup__demo">
            <p>Demo credentials: user@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;