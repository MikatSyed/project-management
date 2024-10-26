"use client";
import StyledComponentsRegistry from "./AntdRegistry";
import { QueryClient, QueryClientProvider } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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