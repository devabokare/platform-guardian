import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save, Globe, Bell, Shield, Palette, Mail } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your platform settings have been updated successfully.',
    });
  };

  return (
    <AdminLayout>
      <div className="animate-fade-in max-w-4xl">
        <PageHeader
          title="Platform Settings"
          description="Configure global platform settings and preferences."
          actions={
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          }
        />

        <div className="space-y-8">
          {/* General Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">General Settings</h3>
                <p className="text-sm text-muted-foreground">Basic platform configuration</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" defaultValue="EduPlatform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@eduplatform.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="platformUrl">Platform URL</Label>
                <Input id="platformUrl" defaultValue="https://eduplatform.com" />
              </div>
            </div>
          </div>

          {/* Verification Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success/10 rounded-lg">
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Verification Rules</h3>
                <p className="text-sm text-muted-foreground">Configure verification requirements</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Document Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Institutions must submit documents for verification
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-verify Students</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically verify students from verified institutions
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Counselor Credential Check</p>
                  <p className="text-sm text-muted-foreground">
                    Require credential verification for counselors
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-info/10 rounded-lg">
                <Bell className="h-5 w-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Configure notification preferences</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email alerts for new registrations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pending Verification Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Daily digest of pending verifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Immediate alerts for security events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Branding Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Palette className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Platform Branding</h3>
                <p className="text-sm text-muted-foreground">Customize platform appearance</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input id="primaryColor" defaultValue="#1e3a5f" className="flex-1" />
                  <div className="w-10 h-10 rounded-lg bg-primary border border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex gap-2">
                  <Input id="accentColor" defaultValue="#10b981" className="flex-1" />
                  <div className="w-10 h-10 rounded-lg bg-accent border border-border" />
                </div>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-muted rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email Configuration</h3>
                <p className="text-sm text-muted-foreground">Configure email delivery settings</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input id="smtpHost" placeholder="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input id="smtpPort" placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input id="smtpUser" placeholder="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPass">SMTP Password</Label>
                <Input id="smtpPass" type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
