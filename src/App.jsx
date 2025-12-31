import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { LayoutProvider } from './context/LayoutContext';
import { AnimatePresence } from 'framer-motion';
import { VoteProvider } from './context/VoteContext';

// Lazy load pages for performance
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Categories = lazy(() => import('./pages/Categories'));
const Nominees = lazy(() => import('./pages/Nominees'));
const Profile = lazy(() => import('./pages/Profile'));
const Results = lazy(() => import('./pages/Results'));
const VoteSuccess = lazy(() => import('./pages/VoteSuccess'));
const Admin = lazy(() => import('./pages/Admin'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
);

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Landing />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="nominees" element={<Nominees />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="results" element={<Results />} />
                        <Route path="vote-success" element={<VoteSuccess />} />
                        <Route path="admin-192025" element={<Admin />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
}

function App() {
    return (
        <Router>
            <VoteProvider>
                <LayoutProvider>
                    <AnimatedRoutes />
                </LayoutProvider>
            </VoteProvider>
        </Router>
    );
}

export default App;
