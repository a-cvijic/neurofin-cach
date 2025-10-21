// IMPROVEMENT #5: Add security and trust badges

import React, { useState } from 'react';
import { Shield, Lock, CheckCircle, Info } from 'lucide-react';

const Footer = () => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  return (
    <>
      <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Security badges */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lock className="w-4 h-4" />
                <span>Bank-Level Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Shield className="w-4 h-4" />
                <span>Your Data is Never Sold</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <button
                onClick={() => setShowSecurityModal(true)}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <Info className="w-4 h-4" />
                How We Protect Your Data
              </button>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-slate-500 text-xs mt-3">
            © 2025 NeuroFin Coach | Developed by Aleksa Cvijic & Emilia Mitrovic
          </div>
        </div>
      </footer>

      {/* Security Info Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 max-w-lg shadow-2xl shadow-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">How We Protect Your Data</h3>
            </div>

            <div className="space-y-3 text-slate-300 mb-6">
              <p>
                <strong className="text-emerald-400">🔒 Bank-Level Encryption:</strong> All data is encrypted using AES-256 encryption, the same standard used by financial institutions worldwide.
              </p>
              <p>
                <strong className="text-blue-400">🛡️ No Data Selling:</strong> We never sell, rent, or share your personal financial data with third parties. Your privacy is non-negotiable.
              </p>
              <p>
                <strong className="text-green-400">✓ GDPR Compliant:</strong> We fully comply with EU data protection regulations, giving you complete control over your data.
              </p>
              <p>
                <strong className="text-purple-400">🔐 Secure Connections:</strong> When you connect your bank, we use read-only access through certified partners like Plaid. We never store your login credentials.
              </p>
            </div>

            <button
              onClick={() => setShowSecurityModal(false)}
              className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all font-medium"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;