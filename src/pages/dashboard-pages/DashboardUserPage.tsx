import { useDeleteUserMutation, useGetAlluserQuery, useUpdateuserMutation } from "@/redux/features/users/userApi"
import { MoreHorizontal, Trash2, Loader2, UserCog, Shield, ShieldAlert, ShieldCheck, Settings } from "lucide-react"
import { toast } from "sonner"
import moment from "moment"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TUser } from "@/utils/Interfaces"

const DashboardUserPage = () => {
  const { data: usersResponse, isLoading, isError, refetch } = useGetAlluserQuery("")

  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateuserMutation()

  const users = usersResponse?.data || []

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    )

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Error fetching users</h3>
              <p className="text-sm text-muted-foreground mt-2">
                There was a problem loading the user data. Please try again later.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )

  const handleDeleteUser = async (id?: string) => {
    if (!id) {
      toast.error("User ID is missing")
      return
    }
    try {
      await deleteUser(id)
      refetch()
      toast.success("User deleted successfully")
    } catch (err) {
      toast.error("Cannot delete user")
    }
  }

  const handleDeactivateUser = async (id?: string, status: "active" | "deactivate" = "deactivate") => {
    if (!id) {
      toast.error("User ID is missing")
      return
    }
    try {
      await updateUser({
        userId: id,
        updateduser: { status: status },
      })
      refetch()
      toast.success(`User ${status === "active" ? "activated" : "deactivated"} successfully`)
    } catch (err) {
      toast.error("Failed to update user status!")
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4 mr-2" />
      case "moderator":
        return <ShieldCheck className="w-4 h-4 mr-2" />
      default:
        return <UserCog className="w-4 h-4 mr-2" />
    }
  }

  return (
  
      <Card className="border-none p-0 shadow-none">
        <CardHeader className="p-0 mb-5">
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {users.map((user: TUser) => {
                  if (!user._id) return null
                  return (
                    <tr className="bg-card hover:bg-muted/50 transition-colors" key={user._id}>
                      <td className="px-6 py-4 font-medium">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={`${
                            user.status === "active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {moment(user.createdAt).format("DD MMM YYYY")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeactivateUser(user._id, user.status === "active" ? "deactivate" : "active")
                              }
                              className="cursor-pointer"
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              {user.status === "active" ? "Deactivate" : "Activate"} User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-destructive focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

  )
}

export default DashboardUserPage
