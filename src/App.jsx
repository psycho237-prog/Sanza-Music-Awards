import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { LayoutProvider } from './context/LayoutContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Nominees from './pages/Nominees';
import Profile from './pages/Profile';
import Results from './pages/Results';
import VoteSuccess from './pages/VoteSuccess';
import { AnimatePresence } from 'framer-motion';
import { VoteProvider } from './context/VoteContext';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Landing />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="nominees" element={<Nominees />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="results" element={<Results />} />
                    <Route path="vote-success" element={<VoteSuccess />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
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
