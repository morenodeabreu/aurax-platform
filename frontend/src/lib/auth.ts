import { authApi } from './api/auth'

const TOKEN_KEY = 'aurax_token'
const USER_KEY = 'aurax_user'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export class AuthManager {
  static getToken(): string | null {
    if (typeof window \!== 'undefined') {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  }

  static setToken(token: string): void {
    if (typeof window \!== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token)
    }
  }

  static clearToken(): void {
    if (typeof window \!== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  static getUser(): AuthUser | null {
    if (typeof window \!== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  static setUser(user: AuthUser): void {
    if (typeof window \!== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }
  }

  static clearUser(): void {
    if (typeof window \!== 'undefined') {
      localStorage.removeItem(USER_KEY)
    }
  }

  static async login(email: string, password: string): Promise<AuthUser> {
    try {
      const response = await authApi.login({ email, password })
      this.setToken(response.access_token)
      
      // Get user info
      const user = await authApi.getCurrentUser()
      this.setUser(user)
      
      return user
    } catch (error) {
      this.clearToken()
      this.clearUser()
      throw error
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthUser> {
    try {
      const response = await authApi.register({ name, email, password })
      this.setToken(response.access_token)
      
      // Get user info
      const user = await authApi.getCurrentUser()
      this.setUser(user)
      
      return user
    } catch (error) {
      this.clearToken()
      this.clearUser()
      throw error
    }
  }

  static logout(): void {
    this.clearToken()
    this.clearUser()
  }

  static isAuthenticated(): boolean {
    return \!\!this.getToken()
  }
}

export const authManager = new AuthManager()
export default AuthManager
