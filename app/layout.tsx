import '@/css/style.css';
import type { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '../components/Sidebare'

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="de">
			<body>
				<div className="site-wrapper">
					<Header />
					<div className="site-content">
						<Sidebar />
						<div>{children}</div>
					</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}