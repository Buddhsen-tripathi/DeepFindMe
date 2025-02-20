'use client';

import { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
    }
  }, [isSignedIn, router]);

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      setError('Please enter a valid new password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await user?.updatePassword({ newPassword });
      alert('Password updated successfully.');
      setNewPassword('');
      setCurrentPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await user?.delete();
      await signOut({ redirectUrl: '/' });
      alert('Account deleted successfully.');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete account.');
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Redirecting to sign-in...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <section className="py-20 bg-gray-900 flex-grow">
        <div className="container mx-auto px-4 max-w-md">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="loader border-cyan-400"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4">{error}</div>
          )}

          {/* Profile Info */}
          <Card className="bg-black bg-opacity-50 border border-cyan-500 p-6 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-cyan-400">
                {user.username || user.firstName || 'User'}'s Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-2">
                <strong>Email:</strong> {user.emailAddresses[0].emailAddress}
              </p>
              <p className="text-white">
                <strong>Account Created:</strong>{' '}
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-black bg-opacity-50 border border-cyan-500 p-6 mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-cyan-400">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mb-4 text-white"
              />
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-4 text-white"
              />
              <Button
                onClick={handlePasswordChange}
                disabled={loading}
                className="w-full"
              >
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Delete Account */}
          <Card className="bg-black bg-opacity-50 border border-red-500 p-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-red-400">
                Delete Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!deleteConfirmation ? (
                <Button
                  variant="destructive"
                  onClick={() => setDeleteConfirmation(true)}
                  className="w-full"
                >
                  Delete Account
                </Button>
              ) : (
                <div>
                  <p className="text-gray-300 mb-4">
                    Are you sure you want to delete your account? This action cannot
                    be undone.
                  </p>
                  <div className="flex justify-between">
                    <Button
                      variant="destructive"
                      onClick={handleAccountDelete}
                      disabled={loading}
                    >
                      Confirm Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setDeleteConfirmation(false)}
                      className="ml-4"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}