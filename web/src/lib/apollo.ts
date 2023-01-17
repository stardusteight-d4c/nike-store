import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: import.meta.env.VITE_CMS_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_API_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
})
