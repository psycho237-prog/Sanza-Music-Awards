import './globals.css';
import { Providers } from './providers';
import Layout from '@/components/layout/Layout';

export const metadata = {
    title: 'African Singing Awards',
    description: 'Premium voting platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="dark">
            <body>
                <Providers>
                    <Layout>{children}</Layout>
                </Providers>
            </body>
        </html>
    );
}
