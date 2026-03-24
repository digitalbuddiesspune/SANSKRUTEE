import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SecurityPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FE1157]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] lg:hidden">
      {/* Header */}
      <div className="bg-[#0F1012] text-[#FFFFFF] sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-4">
          <Link to="/profile" className="p-2 -ml-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h2 className="text-lg font-bold">Security</h2>
            <p className="text-xs text-[#FFFFFF]/80">Password & 2FA</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between p-5 border border-[#FE1157] bg-white/60 backdrop-blur-sm rounded-lg luxury-shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-[#0F1012]">Password</h4>
            <p className="text-xs text-[#0F1012] mt-1">Last changed 30 days ago</p>
          </div>
          <button className="text-sm font-semibold text-[#0F1012] hover:text-white border border-[#FE1157] px-4 py-2 hover:bg-[#FE1157] transition-colors rounded luxury-shadow-sm">Update</button>
        </div>
        <div className="flex items-center justify-between p-5 border border-[#FE1157] bg-white/60 backdrop-blur-sm rounded-lg luxury-shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-[#0F1012]">Two-Factor Authentication</h4>
            <p className="text-xs text-[#0F1012] mt-1">Add an extra layer of security</p>
          </div>
          <div className="relative inline-block w-11 h-6 align-middle select-none">
            <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border border-[#FE1157] appearance-none cursor-pointer top-0.5 left-0.5 transition-all"/>
            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-[#FE1157]/20 cursor-pointer"></label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;

