import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose, redirectTo = null }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      onClose();
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        window.location.reload();
      }
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A2F2A]/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF6F0] border border-[#E0D8CE] max-w-md w-full mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1A2F2A] hover:opacity-70 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1A2F2A] uppercase tracking-tight">Sign In Required</h2>
          <p className="text-sm text-[#8B9A95] mt-2">
            Please sign in to add items to your cart.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-[#FAF6F0] border border-[#E0D8CE] border-l-4 border-l-[#C4A265] text-[#1A2F2A] px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1A2F2A] mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[#E0D8CE] bg-[#F5F0E8] text-[#1A2F2A] focus:outline-none focus:border-[#2B6B5A] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1A2F2A] mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[#E0D8CE] bg-[#F5F0E8] text-[#1A2F2A] focus:outline-none focus:border-[#2B6B5A] transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 border border-[#2B6B5A] bg-[#2B6B5A] text-white py-2.5 px-4 font-medium hover:bg-[#1A4D3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tight text-sm"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#E0D8CE] bg-[#F5F0E8] text-[#1A2F2A] hover:bg-[#E0D8CE]/50 transition-colors uppercase tracking-tight text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t-2 border-[#E0D8CE] text-center text-sm">
          <p className="text-[#8B9A95]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              onClick={onClose}
              className="text-[#C4A265] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

