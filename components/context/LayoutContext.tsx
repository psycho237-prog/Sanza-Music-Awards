"use client";

import React, { createContext, useContext, useState } from 'react';

interface LayoutContextType {
    isNavbarVisible: boolean;
    hideNavbar: () => void;
    showNavbar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    const hideNavbar = () => setIsNavbarVisible(false);
    const showNavbar = () => setIsNavbarVisible(true);

    return (
        <LayoutContext.Provider value={{ isNavbarVisible, hideNavbar, showNavbar }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};
