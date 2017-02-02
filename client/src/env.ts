export type NodeEnv = 'production' | 'development'

export interface Environment {
   NODE_ENV: NodeEnv
   production: boolean
   development: boolean
   API_URL: string
}

const prodEnv: Environment = {
   NODE_ENV: 'production',
   production: true,
   development: false,
   API_URL: ''
}

const devEnv: Environment = {
   NODE_ENV: 'development',
   production: false,
   development: true,
   API_URL: 'http://localhost:8021/'
}

export const env: Environment = process.env.NODE_ENV === 'production' ? prodEnv : devEnv
