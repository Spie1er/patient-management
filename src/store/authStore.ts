import { create } from 'zustand'
import mockUsersJson from '../database/users.json'

interface User {
  username: string
  password: string
  role: 'admin' | 'doctor' | 'appuser'
}

const mockUsers: User[] = mockUsersJson as User[]

interface AuthState {
  user: Omit<User, 'password'> | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('user')!) as Omit<User, 'password'>)
    : null,

  login: (username, password) => {
    const user = mockUsers.find((u) => u.username === username && u.password === password)
    if (user) {
      const userWithoutPassword = { username: user.username, role: user.role }
      set({ user: userWithoutPassword })
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  },

  logout: () => {
    set({ user: null })
    localStorage.removeItem('user')
  },
}))
