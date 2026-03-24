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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F1012]/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFFFF] border border-[#FE1157] max-w-md w-full mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#0F1012] hover:opacity-70 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0F1012] uppercase tracking-tight">Sign In Required</h2>
          <p className="text-sm text-[#0F1012] mt-2">
            Please sign in to add items to your cart.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-[#FFFFFF] border border-[#FE1157] border-l-4 border-l-[#FE1157] text-[#0F1012] px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0F1012] mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[#FE1157] bg-[#FFFFFF] text-[#0F1012] focus:outline-none focus:border-[#FE1157] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#0F1012] mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[#FE1157] bg-[#FFFFFF] text-[#0F1012] focus:outline-none focus:border-[#FE1157] transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 border border-[#FE1157] bg-[#FE1157] text-white py-2.5 px-4 font-medium hover:bg-[#0F1012] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tight text-sm"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-[#FE1157] bg-[#FFFFFF] text-[#0F1012] hover:bg-[#FE1157]/50 transition-colors uppercase tracking-tight text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t-2 border-[#FE1157] text-center text-sm">
          <p className="text-[#0F1012]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              onClick={onClose}
              className="text-[#FE1157] hover:underline font-medium"
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

