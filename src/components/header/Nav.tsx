import Link from "next/link"
import Logo from "./Logo"
import MobileMenuOpenBtn from "./MobileMenuOpenBtn"
import MobileNavMenu from "./MobileNavMenu"
import SocialLinks from "./SocialLinks"

export default function Nav() {
	// const activeStyles = "border-b-2 border-white py-1"

	return (
		<nav className="fixed w-full h-20 px-8 bg-background z-50">
			<div className="flex justify-between items-center h-full w-full">
				<Logo />
				<ul className="hidden md:flex items-center gap-5 lg:gap-10 uppercase text-primaryText font-bold">
					<li>
						<Link
							href="/"
							className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							href="/creators"
							className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
						>
							Creators
						</Link>
					</li>
					<li>
						<Link
							href="/store"
							className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
						>
							Store
						</Link>
					</li>
					<li>
						<Link
							href="/games"
							className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
						>
							Games
						</Link>
					</li>
				</ul>
				<ul className="hidden md:flex items-center gap-5 lg:gap-7 text-primaryText">
					<li className="hidden lg:block uppercase font-bold">Connect</li>
					<SocialLinks />
				</ul>
				<MobileMenuOpenBtn />
			</div>

			<MobileNavMenu />
		</nav>
	)
}
