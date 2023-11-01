
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a react query client
// This will be used to make queries and mutations
const queryClient = new QueryClient()

// This component will be used in the main.tsx file to wrap the App component
// This will make the react query client available to all the components in the app

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

