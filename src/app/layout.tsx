import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/redux/Provider"
import MobileNav from "@/components/header/mobileNav/MobileNav"
import Sidebar from "@/components/header/sidebar/Sidebar"
import Searchbar from "@/components/searchbar/Searchbar"
import PageTransitionEffect from "@/components/PageTransitionEffect"
import AuthWrapper from "@/utils/AuthWrapper"
import { Toaster } from "@/components/ui/toaster"

const barlow = Barlow({ subsets: ["latin"], weight: ["300", "400", "700"] })

export const metadata: Metadata = {
	title: "FUTR Gaming",
	description: "FUTR Gaming - A video game exploration platform"
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={barlow.className}>
				<ReduxProvider>
					<AuthWrapper>
						<div className="md:flex">
							<header>
								<Sidebar />
								<MobileNav />
							</header>
							{/* <PageTransitionEffect>{children}</PageTransitionEffect> */}
							<div className="w-full">
								<div className="hidden md:block">
									<Searchbar />
								</div>
								{children}
							</div>
							<Toaster />
						</div>
					</AuthWrapper>
				</ReduxProvider>
			</body>
		</html>
	)
}
