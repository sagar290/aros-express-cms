export interface User {
  user: Info
  token: Token
}

export interface Token {
  accessToken: string
  token_type: string
}
export interface Info {
  name: string
  phone: string

  email: string
  createdAt: string
  updatedAt: string
}