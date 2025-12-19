import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, LayoutGrid, Trophy, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLayout } from '../../context/LayoutContext';

const Layout = () => {
    const location = useLocation();
    const { isNavbarVisible } = useLayout();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: LayoutGrid, label: 'Categories', path: '/categories' },
        { icon: Trophy, label: 'Results', path: '/results' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 min-h-screen overflow-y-auto scrollbar-hide">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <AnimatePresence>
                {isNavbarVisible && location.pathname !== '/' && (
                    <motion.nav
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/5 px-8 py-4 flex justify-between items-center"
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path === '/categories' && location.pathname === '/nominees');
                            return (
                                <Link key={item.label} to={item.path} className="relative group">
                                    <div className="flex flex-col items-center gap-1">
                                        <item.icon
                                            size={24}
                                            className={`transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-gray-500 group-hover:text-white'}`}
                                        />
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute -bottom-2 w-1 h-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                                            />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
