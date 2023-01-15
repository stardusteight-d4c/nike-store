import { toast } from "react-hot-toast"

export const confirmPassword = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) {
    return true
  } else {
    toast.error('Passwords do not match')
    return false
  }
}