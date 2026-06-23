import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo, useViewport } from '../components/Shared';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function AuthScreen() {
  const { signIn, resetPassword, isConfigured } = useAuth();
  const { isMobile } = useViewport();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await resetPassword(email);
        setMessage('Password reset link sent. Check your email.');
        setMode('login');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode('login');
    setError('');
    setMessage('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--cream)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Brand panel — desktop only */}
      {!isMobile && (
        <div style={{
          flex: '0 0 42%',
          maxWidth: 520,
          background: 'linear-gradient(145deg, var(--espresso) 0%, var(--primary-dark) 55%, var(--primary) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{
            position: 'absolute', bottom: -60, left: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: 40 }}>
              <img
                src="/New logo.png"
                alt="TableMind"
                style={{ width: 52, height: 'auto', display: 'block', marginBottom: 16 }}
              />
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.15,
                marginBottom: 16,
              }}>
                Table<span style={{ color: 'var(--nude-light)' }}>Mind</span>
              </div>
            </div>

            <p style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65,
              maxWidth: 320,
              marginBottom: 36,
            }}>
              Smarter orders. Faster service. Your complete restaurant management system.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Live order tracking', 'Kitchen display sync', 'Owner analytics'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--nude-light)', flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            position: 'relative', zIndex: 1,
            marginTop: 'auto', paddingTop: 48,
            fontSize: 12, color: 'rgba(255,255,255,0.4)',
          }}>
            Made for Ghana · Restaurant Management
          </p>
        </div>
      )}

      {/* Form panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '32px 20px' : '48px 40px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 380,
          animation: 'fadeIn 0.4s ease',
        }}>
          {/* Mobile logo — compact */}
          {isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <Logo size="sm" />
            </div>
          )}

          <div style={{ marginBottom: 28 }}>
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={switchToLogin}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', padding: 0,
                  color: 'var(--text-muted)', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', marginBottom: 20, fontFamily: 'var(--font-body)',
                }}
              >
                <ArrowLeft size={15} /> Back to sign in
              </button>
            )}

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? 26 : 28,
              fontWeight: 700,
              color: 'var(--espresso)',
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              {mode === 'login' ? 'Sign in' : 'Reset password'}
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {mode === 'login'
                ? 'Enter your credentials to access the dashboard'
                : 'We\'ll email you a link to reset your password'}
            </p>
          </div>

          {!isConfigured && (
            <div style={alertBoxStyle('warning')}>
              <AlertCircle size={16} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 13, lineHeight: 1.5 }}>
                Supabase credentials were not loaded. Add <code style={{ fontSize: 12 }}>REACT_APP_SUPABASE_URL</code> and{' '}
                <code style={{ fontSize: 12 }}>REACT_APP_SUPABASE_ANON_KEY</code> to your <code style={{ fontSize: 12 }}>.env</code> file, then{' '}
                <strong>restart the dev server</strong> (stop with Ctrl+C, run <code style={{ fontSize: 12 }}>npm start</code> again).
              </span>
            </div>
          )}

          {error && (
            <div style={alertBoxStyle('error')}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13 }}>{error}</span>
            </div>
          )}

          {message && (
            <div style={alertBoxStyle('success')}>
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13 }}>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email address</label>
              <div style={inputWrapperStyle}>
                <Mail size={16} style={iconStyle} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@restaurant.com"
                  required
                  autoComplete="email"
                  style={inputStyle}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            </div>

            {mode === 'login' && (
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Password</label>
                <div style={inputWrapperStyle}>
                  <Lock size={16} style={iconStyle} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    style={{ ...inputStyle, paddingRight: 42 }}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={toggleBtnStyle}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); setMessage(''); }}
                  style={linkBtnStyle}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'forgot' && <div style={{ marginBottom: 24 }} />}

            <button
              type="submit"
              disabled={loading || !isConfigured}
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: loading || !isConfigured ? 'var(--nude)' : 'var(--primary)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                cursor: loading || !isConfigured ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading || !isConfigured ? 'none' : '0 4px 14px rgba(108, 122, 77, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!loading && isConfigured) e.currentTarget.style.background = 'var(--primary-light)';
              }}
              onMouseLeave={(e) => {
                if (!loading && isConfigured) e.currentTarget.style.background = 'var(--primary)';
              }}
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Send Reset Link'}
            </button>
          </form>

          {isMobile && (
            <p style={{
              textAlign: 'center', marginTop: 32,
              fontSize: 12, color: 'var(--text-muted)',
            }}>
              Made for Ghana · Restaurant Management
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function alertBoxStyle(type) {
  const styles = {
    warning: { bg: 'var(--warning-bg)', border: 'var(--warning)', color: 'var(--espresso)' },
    error: { bg: 'var(--danger-bg)', border: 'var(--warning)', color: 'var(--warning)' },
    success: { bg: 'var(--success-bg)', border: 'var(--success)', color: 'var(--success)' },
  };
  const s = styles[type];
  return {
    display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '12px 14px', borderRadius: 'var(--radius-md)',
    background: s.bg, border: `1.5px solid ${s.border}`,
    marginBottom: 16, color: s.color,
  };
}

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--espresso)',
  marginBottom: 7,
};

const inputWrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  position: 'absolute',
  left: 14,
  color: 'var(--text-muted)',
  pointerEvents: 'none',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px 12px 42px',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border)',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  color: 'var(--espresso)',
  background: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const focusBorder = (e) => {
  e.target.style.borderColor = 'var(--primary)';
  e.target.style.boxShadow = '0 0 0 3px rgba(108, 122, 77, 0.12)';
};

const blurBorder = (e) => {
  e.target.style.borderColor = 'var(--border)';
  e.target.style.boxShadow = 'none';
};

const toggleBtnStyle = {
  position: 'absolute',
  right: 12,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-muted)',
  display: 'flex',
  alignItems: 'center',
  padding: 4,
};

const linkBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--primary)',
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: 13,
  fontFamily: 'var(--font-body)',
};
