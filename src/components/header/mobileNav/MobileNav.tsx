"use client"

import { useState } from "react"
import Logo from "../Logo"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import MobileNavMenu from "./MobileNavMenu"

export default function Nav() {
	const [nav, setNav] = useState(false)

	const handleNav = () => {
		setNav(!nav)
	}

	return (
		<nav className="fixed h-14 w-full bg-foreground px-8 md:hidden z-50">
			<div className="flex justify-between items-center h-full">
				<Logo setNav={setNav} />
				<MobileNavMenu
					nav={nav}
					handleNav={handleNav}
				/>

				<button
					onClick={handleNav}
					aria-label="Open menu"
				>
					<HiOutlineMenuAlt3 size={30} />
				</button>
			</div>
		</nav>
	)
}
