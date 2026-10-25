import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: 'NeoMatrix Logistics Ltd',
    fullName: 'Rudra',
    workEmail: 'rudra@neomatrix.corp',
    gstin: '27XYZPA9876K1ZQ',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <Card accent={true} className="w-full max-w-lg p-8 space-y-6 shadow-soft-lg relative bg-white border-[#E5E3DB]">
      {/* Top green accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#006B4F]" />

      <div className="text-center space-y-1.5">
        <div className="w-10 h-10 rounded-full bg-[#DCEFE7] text-[#006B4F] flex items-center justify-center mx-auto mb-3 shadow-soft-sm">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#1F2522]">
          Deploy Dedicated Audit Tenant
        </h2>
        <p className="text-xs font-mono text-[#68716C]">
          Zero-trust environment initialization for corporate accounts payable
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Corporate Legal Entity"
            icon={Building2}
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
          <Input
            label="Enterprise GSTIN"
            value={formData.gstin}
            onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Account Lead"
            icon={User}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <Input
            label="Work Domain Email"
            type="email"
            icon={Mail}
            value={formData.workEmail}
            onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
            required
          />
        </div>

        <Input
          label="Passphrase"
          type="password"
          icon={Lock}
          placeholder="Minimum 12 characters"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <div className="text-[11px] font-mono text-[#68716C] leading-relaxed">
          By provisioning this workspace, you agree to enable automatic cryptographically hashed audit trails for all processed invoices.
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
          Initialize Tenant Cluster
        </Button>
      </form>

      <div className="text-center text-xs font-mono text-[#68716C] pt-2 border-t border-[#E5E3DB]">
        Already have tenant credentials?{' '}
        <Link to="/login" className="text-[#006B4F] hover:underline font-semibold">
          Return to Sign In
        </Link>
      </div>
    </Card>
  );
};
