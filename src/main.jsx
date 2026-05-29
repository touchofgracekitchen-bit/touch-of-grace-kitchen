import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#F0EBE0', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif'
        }}>
          <div style={{
            background: 'white', borderRadius: 12, padding: 40,
            maxWidth: 480, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{fontSize: 40, marginBottom: 16}}>🍽️</div>
            <h2 style={{color: '#1A1208', marginBottom: 8}}>Something went wrong</h2>
            <p style={{color: '#666', fontSize: 14, marginBottom: 8}}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <p style={{color: '#999', fontSize: 12, marginBottom: 24}}>
              Your data is safe. This is just a display error.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                background: '#1B5E20', color: 'white', border: 'none',
                borderRadius: 8, padding: '12px 24px', fontSize: 14,
                fontWeight: 700, cursor: 'pointer', fontFamily: 'Georgia,serif'
              }}
            >
              Tap to try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
