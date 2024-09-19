export interface CreateLoginRequest {
  email: string
  password: string
}

export async function createLogin({
  email,
  password,
}: CreateLoginRequest): Promise<void> {
  const response = await fetch('http://localhost:3333/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error('Error while creating the login')
  }
}
