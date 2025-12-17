import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Grid, Mic2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Grid, label: 'Categories', path: '/categories' },
        { icon: Mic2, label: 'Vote', path: '/nominees' }, // Placeholder path
        { icon: User, label: 'Profile', path: '/profile' }, // Placeholder path
    ];

    return (
        <div className="min-h-screen bg-dark text-white overflow-hidden relative font-sans">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 pb-24 min-h-screen overflow-y-auto">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/10 pb-safe">
                <div className="flex justify-around items-center p-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.label} to={item.path} className="relative group">
                                <div className="flex flex-col items-center gap-1">
                                    <item.icon
                                        size={24}
                                        className={`transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-gray-400 group-hover:text-white'}`}
                                    />
                                    <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-gray-400 group-hover:text-white'}`}>
                                        {item.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute -top-4 w-8 h-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
