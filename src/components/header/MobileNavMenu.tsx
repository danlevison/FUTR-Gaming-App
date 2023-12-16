"use client"

import Link from "next/link"
import MobileMenuCloseBtn from "./MobileMenuCloseBtn"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import SocialLinks from "./SocialLinks"

export default function MobileNavMenu() {
	const sidebarStatus = useSelector(
		(state: RootState) => state.sidebar.sidebarStatus
	)
	// const activeStyles =
	// 	"border-b-2 border-black font-semibold py-1 hover:text-secondaryAccent hover:border-b-2 hover:border-secondaryAccent"

	return (
		<div className={sidebarStatus ? "md:hidden" : ""}>
			<div
				className={`fixed top-0 h-screen px-10 py-[1.5rem] shadow-lg bg-white ${
					sidebarStatus
						? "right-0 w-[300px] duration-300 bg-background"
						: "right-[-100%] duration-500"
				}`}
			>
				<div className="flex items-center justify-end text-accentText">
					<MobileMenuCloseBtn />
				</div>

				<div className="py-6">
					<ul className="flex flex-col items-center text-center gap-6 mt-4 text-accentText text-lg uppercase tracking-widest">
						<li className="border-b border-gray-300 pb-4 w-full">
							<Link
								href="/"
								className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent"
							>
								Home
							</Link>
						</li>
						<li className="border-b border-gray-300 pb-4 w-full">
							<Link
								href="creators"
								className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent"
							>
								Creators
							</Link>
						</li>
						<li className="border-b border-gray-300 pb-4 w-full">
							<Link
								href="stores"
								className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent"
							>
								Stores
							</Link>
						</li>
						<li className="border-b border-gray-300 pb-4 w-full">
							<Link
								href="games"
								className="hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent"
							>
								Games
							</Link>
						</li>
					</ul>
					<div className="text-accentText uppercase text-center mt-16">
						<p className="font-bold text-lg tracking-widest">Connect</p>
						<ul className="flex items-center justify-evenly mt-5">
							<SocialLinks />
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
