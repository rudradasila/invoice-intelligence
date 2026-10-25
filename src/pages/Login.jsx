import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rudra@neomatrix.corp');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <Card accent={true} className="w-full max-w-md p-8 space-y-6 shadow-soft-lg relative bg-white border-[#E5E3DB]">
      {/* Top green accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#006B4F]" />

      <div className="text-center space-y-1.5">
        <div className="w-10 h-10 rounded-full bg-[#DCEFE7] text-[#006B4F] flex items-center justify-center mx-auto mb-3 shadow-soft-sm">
          <KeyRound className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#1F2522]">
          Enterprise Authentication
        </h2>
        <p className="text-xs font-mono text-[#68716C]">
          Sign in to access encrypted financial audit clusters
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Corporate Identity Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-1">
          <Input
            label="Passphrase"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <a href="#forgot" className="text-[11px] font-mono text-[#68716C] hover:text-[#006B4F] transition-colors">
              Forgot security key?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Sign In to Console
        </Button>
      </form>

      {/* Demo Credentials Helper */}
      <div className="p-3 rounded bg-[#F1EFE7] border border-[#E5E3DB] text-xs font-mono text-[#68716C] space-y-1">
        <div className="flex justify-between text-[#1F2522] font-semibold">
          <span>Demo Account Pre-filled:</span>
          <span className="text-[#006B4F]">CFO Access</span>
        </div>
        <div className="text-[11px]">Click "Sign In to Console" to immediately enter the dashboard.</div>
      </div>

      <div className="text-center text-xs font-mono text-[#68716C] pt-2 border-t border-[#E5E3DB]">
        New enterprise tenant?{' '}
        <Link to="/register" className="text-[#006B4F] hover:underline font-semibold">
          Request Organization Provisioning
        </Link>
      </div>
    </Card>
  );
};
