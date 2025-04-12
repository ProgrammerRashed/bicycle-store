import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import UseActiveUser from "@/hook/UseActiveUser"
import { useGetAlluserQuery, useUpdateuserMutation } from "@/redux/features/users/userApi"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { setUser, useCurrentToken } from "@/redux/features/auth/authSlice"
import { useChangePasswordMutation } from "@/redux/features/auth/authApi"

export default function ProfilePage() {
  const [changePassword] = useChangePasswordMutation();
  const [tab, setTab] = useState("profile")
  const {user} = UseActiveUser()
  const { refetch } = useGetAlluserQuery("");
  const [updateUser] = useUpdateuserMutation();
  const dispatch = useAppDispatch();
  const currentToken = useAppSelector(useCurrentToken);
  const [profileData, setProfileData] = useState({
    // @ts-ignore
    firstName: user?.name?.split(" ")[0] || "",
    // @ts-ignore
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email,
  })


  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    if (user?.email !== profileData.email) {
      toast.error("Email cannot be changed");
      return;
    }
  
    try {
      const res = await updateUser({
        userId: user?.userId as string,
        updateduser: profileData,
      }).unwrap(); // Unwrap to directly get the returned data
  
      refetch();

      // Update user in the store
      // @ts-ignore
      const updatedUser = {
        // @ts-ignore
        userId: res?.data._id,
        // @ts-ignore
        name: res?.data.firstName + " " + res.data.lastName,
        // @ts-ignore
        email: res?.data.email,
        // @ts-ignore
        role: res?.data.role,
        // @ts-ignore
        createdAt: res?.data.createdAt,
      }
  
      // Dispatch only updated user with the same token
      dispatch(setUser({ user: updatedUser, token: currentToken }));
  
      toast.success("Your profile has been updated successfully");
    } catch (err) {
      toast.error("Failed to update user!");
    }
  };

  const handlePasswordSubmit =async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password must match")
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long")
      return
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      toast.success("Password changed successfully!");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
     
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex space-x-4">
        <Button variant="outline" onClick={() => setTab("profile")}>
          Edit Profile
        </Button>
        <Button variant="outline" onClick={() => setTab("password")}>
          Change Password
        </Button>
      </div>
      {/* Update your Profile  */}
      { tab === "profile" && (  <form onSubmit={handleProfileSubmit}>
        <CardHeader className="p-0">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0 mt-5">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={profileData.lastName} onChange={handleProfileChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
              />
            </div>
          </div>

        </CardContent>
        <CardFooter className="p-0 mt-5">
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>)}

      {/* Change Password */}
      { tab === "password" && (   <form onSubmit={handlePasswordSubmit}>
        <CardHeader className="p-0">
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-0 mt-5">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-5">
          <Button type="submit">Update Password</Button>
        </CardFooter>
      </form>)}
    </div>
  )
}

