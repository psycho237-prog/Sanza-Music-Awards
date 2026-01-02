'use client';

import { VoteProvider } from '@/components/context/VoteContext';
import { LayoutProvider } from '@/components/context/LayoutContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <VoteProvider>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </VoteProvider>
    );
}
