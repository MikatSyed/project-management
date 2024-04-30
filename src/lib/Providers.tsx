"use client";
import StyledComponentsRegistry from "./AntdRegistry";
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
const Providers = ({children} : {children: React.ReactNode}) => {
    return (
   
        <QueryClientProvider client={queryClient}>
            <StyledComponentsRegistry>
            {children}
            </StyledComponentsRegistry>
            </QueryClientProvider>
         
          
    )
}

export default Providers;