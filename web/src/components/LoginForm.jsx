import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from './AuthContext.jsx';
export default function LoginForm() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const next = new URLSearchParams(loc.search).get('next') || '/';
  const edit = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result =
        mode === 'login'
          ? await api.login({ email: form.email, password: form.password })
          : await api.register(form);
      login(result.user, result.token);
      navigate(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} data-testid="login-form">
      {mode === 'register' && (
        <label>
          Name
          <input
            data-testid="login-name"
            value={form.name}
            onChange={edit('name')}
          />
        </label>
      )}
      <label>
        Email
        <input
          data-testid="login-email"
          type="email"
          value={form.email}
          onChange={edit('email')}
        />
      </label>
      <label>
        Password
        <input
          data-testid="login-password"
          type="password"
          value={form.password}
          onChange={edit('password')}
        />
      </label>
      {error && (
        <p role="alert" data-testid="login-error">
          {error}
        </p>
      )}
      <button data-testid="login-submit" disabled={busy} type="submit">
        {busy ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Register'}
      </button>
      <button
        type="button"
        data-testid="register-link"
        onClick={() => {
          setMode((m) => (m === 'login' ? 'register' : 'login'));
          setError('');
        }}
      >
        {mode === 'login'
          ? 'Need an account? Register'
          : 'Already registered? Log in'}
      </button>
    </form>
  );
}
