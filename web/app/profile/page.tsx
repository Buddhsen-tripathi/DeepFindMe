"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function ProfilePage() {
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
    created_at: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword,setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userUuid = localStorage.getItem("user_uuid");
      setLoading(true);

      if (!userUuid) {
        setError("No user found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/${userUuid}`
        );
        setProfile(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch profile.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      setError("Please enter a valid new password.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, { newPassword, currentPassword });
      alert("Password updated successfully.");
      setNewPassword("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update password.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/delete-account`);
      alert("Account deleted successfully.");
      // Redirect or handle post-deletion
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to delete account.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
              {error}
            </div>
          )}

          {!loading && profile && (
            <>
              {/* Profile Info */}
              <Card className="bg-black bg-opacity-50 border border-cyan-500 p-6 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-cyan-400">
                    {profile.username}'s Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white mb-2">
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p className="text-white">
                    <strong>Account Created:</strong>{" "}
                    {new Date(profile.created_at).toLocaleDateString()}
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
                    placeholder="Old Password"
                    value={currentPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
                        Are you sure you want to delete your account? This action
                        cannot be undone.
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
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
