import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  Sliders,
  Bell,
  Cpu,
  Key,
  Database,
  CheckCircle2,
  Save,
  Cloud,
  ExternalLink,
  Check
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { userProfile } from '../data/mockData';
import { getCloudinaryConfig, saveCloudinaryConfig } from '../services/cloudinary';

export const Settings = () => {
  const [profile, setProfile] = useState(userProfile);
  const [varianceTolerance, setVarianceTolerance] = useState(profile.varianceThreshold);
  const [autoApprove, setAutoApprove] = useState(profile.autoApproveVerified);
  const [savedMessage, setSavedMessage] = useState(false);

  // Cloudinary state
  const [cloudName, setCloudName] = useState('');
  const [uploadPreset, setUploadPreset] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [cloudStatus, setCloudStatus] = useState(false);
  const [cloudSaved, setCloudSaved] = useState(false);

  useEffect(() => {
    const config = getCloudinaryConfig();
    setCloudName(config.cloudName);
    setUploadPreset(config.uploadPreset);
    setApiKey(config.apiKey);
    setCloudStatus(config.isConfigured);
  }, []);

  const handleSave = (e) => {
    e?.preventDefault();
    saveCloudinaryConfig({ cloudName, uploadPreset, apiKey });
    setCloudStatus(Boolean(cloudName && uploadPreset));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleCloudinarySave = (e) => {
    e.preventDefault();
    saveCloudinaryConfig({ cloudName, uploadPreset, apiKey });
    setCloudStatus(Boolean(cloudName && uploadPreset));
    setCloudSaved(true);
    setTimeout(() => setCloudSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DB]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1F2522]">
            System & Risk Configuration
          </h1>
          <p className="text-xs text-[#68716C] mt-1 font-mono">
            Manage organization policies, Cloudinary vaults, AI thresholds, and ERP webhooks
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Save}
          onClick={handleSave}
        >
          Save All Changes
        </Button>
      </div>

      {savedMessage && (
        <div className="p-3 bg-white border border-[#E5E3DB] rounded text-xs font-mono text-[#1F2522] flex items-center gap-2 shadow-soft-sm">
          <CheckCircle2 className="w-4 h-4 text-[#006B4F]" />
          <span>System configuration parameters committed to cluster.</span>
        </div>
      )}

      {/* Cloudinary Integration Section */}
      <Card accent={true} className="p-6 space-y-5 shadow-soft-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DB]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#DCEFE7] text-[#006B4F]">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1F2522] tracking-tight">
                Cloudinary Document Storage Vault
              </h3>
              <p className="text-xs font-mono text-[#68716C]">
                Stores uploaded PDF invoices, raw receipts, and high-res scans
              </p>
            </div>
          </div>
          {cloudStatus ? (
            <Badge variant="primary" dot={true}>Connected</Badge>
          ) : (
            <Badge variant="warning" dot={true}>Sandbox Mode</Badge>
          )}
        </div>

        <form onSubmit={handleCloudinarySave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Cloudinary Cloud Name"
              placeholder="e.g. your-cloud-name"
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
            />
            <Input
              label="Unsigned Upload Preset"
              placeholder="e.g. invoice_preset"
              value={uploadPreset}
              onChange={(e) => setUploadPreset(e.target.value)}
            />
            <Input
              label="API Key (Optional)"
              type="password"
              placeholder="Optional"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded text-[11px] font-mono text-[#68716C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>
              Create an <strong>Unsigned Upload Preset</strong> in your Cloudinary Console &rarr; Settings &rarr; Upload &rarr; Upload Presets.
            </span>
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Save}
              >
                {cloudSaved ? 'Saved!' : 'Save Cloudinary Config'}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* User & Organization Details */}
      <Card className="p-6 space-y-5 shadow-soft-sm">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E3DB]">
          <User className="w-4 h-4 text-[#006B4F]" />
          <h3 className="text-sm font-semibold text-[#1F2522] tracking-tight">
            Executive Profile & Credential Identity
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <Input
            label="Work Email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Input
            label="Designated Role"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          />
          <Input
            label="Enterprise Tenant"
            value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
          />
        </div>
      </Card>

      {/* AI Extraction & Tolerance Thresholds */}
      <Card className="p-6 space-y-5 shadow-soft-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DB]">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-[#006B4F]" />
            <h3 className="text-sm font-semibold text-[#1F2522] tracking-tight">
              AI Auditing & Discrepancy Sensitivities
            </h3>
          </div>
          <Badge variant="primary">Active Model: LayoutLMv3-Hybrid</Badge>
        </div>

        <div className="space-y-6">
          {/* Tolerance slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#68716C]">Price Variance Tolerance:</span>
              <span className="text-[#006B4F] font-bold">{varianceTolerance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={varianceTolerance}
              onChange={(e) => setVarianceTolerance(e.target.value)}
              className="w-full accent-[#006B4F] bg-[#F1EFE7] rounded-lg h-2 cursor-pointer"
            />
            <p className="text-[11px] font-mono text-[#68716C]">
              Invoices with line item rate differences exceeding {varianceTolerance}% will automatically trigger high-severity alerts.
            </p>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2 border-t border-[#E5E3DB]">
            <div className="flex items-center justify-between p-3 rounded bg-[#F1EFE7] border border-[#E5E3DB]">
              <div>
                <div className="text-xs font-semibold text-[#1F2522] font-mono">
                  Automate ERP Posting for 100% Verified Invoices
                </div>
                <div className="text-[11px] text-[#68716C] font-mono">
                  Bypasses manual AP review if 3-way match yields 0 discrepancies.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAutoApprove(!autoApprove)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${autoApprove ? 'bg-[#006B4F]' : 'bg-[#D5D3CB]'}`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${autoApprove ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Connected ERP Integrations */}
      <Card className="p-6 space-y-4 shadow-soft-sm">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E3DB]">
          <Database className="w-4 h-4 text-[#006B4F]" />
          <h3 className="text-sm font-semibold text-[#1F2522] tracking-tight">
            Connected ERP Systems
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded flex flex-col justify-between">
            <div>
              <div className="font-bold text-[#1F2522]">SAP S/4HANA</div>
              <div className="text-[10px] text-[#68716C] mt-0.5">OData v4 Connector</div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[#006B4F] flex items-center gap-1 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" /> CONNECTED
              </span>
              <button className="text-[#68716C] hover:text-[#006B4F]">Config</button>
            </div>
          </div>

          <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded flex flex-col justify-between">
            <div>
              <div className="font-bold text-[#1F2522]">Oracle Cloud ERP</div>
              <div className="text-[10px] text-[#68716C] mt-0.5">REST Webhook</div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[#68716C] text-[11px]">STANDBY</span>
              <button className="text-[#68716C] hover:text-[#006B4F]">Enable</button>
            </div>
          </div>

          <div className="p-3 bg-[#F1EFE7] border border-[#E5E3DB] rounded flex flex-col justify-between">
            <div>
              <div className="font-bold text-[#1F2522]">TallyPrime XML</div>
              <div className="text-[10px] text-[#68716C] mt-0.5">Local Daemon Sync</div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[#006B4F] flex items-center gap-1 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006B4F]" /> SYNCED
              </span>
              <button className="text-[#68716C] hover:text-[#006B4F]">Config</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
