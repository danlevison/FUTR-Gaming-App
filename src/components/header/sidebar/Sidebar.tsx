"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Logo from "../Logo"
import SocialLinks from "../SocialLinks"
import NavLinks from "../NavLinks"
import CollapseSidebarBtn from "./CollapseSidebarBtn"

export default function Sidebar() {
	const [sidebar, setSidebar] = useState(false)
	const sidebarAnimation = {
		open: {
			width: "200px",
			transition: {
				duration: 0.5,
				type: "spring",
				damping: 10
			}
		},
		closed: {
			width: "70px",
			transition: {
				duration: 0.5,
				type: "spring",
				damping: 10
			}
		}
	}

	return (
		<motion.aside
			variants={sidebarAnimation}
			initial={"closed"}
			animate={sidebar ? "open" : "closed"}
			className={`hidden fixed top-0 h-14 z-50 md:flex justify-between items-center bg-foreground p-4 shadow-2xl backdrop-blur-2xl backdrop-filter md:sticky md:h-screen md:overflow-y-auto md:overflow-x-hidden md:flex-col md:justify-start md:gap-4 ${
				sidebar ? "md:items-start" : "md:items-center"
			}`}
		>
			<Logo sidebarStatus={sidebar} />
			<NavLinks sidebarStatus={sidebar} />
			<SocialLinks sidebarStatus={sidebar} />
			<CollapseSidebarBtn
				sidebarStatus={sidebar}
				setSidebar={setSidebar}
			/>
		</motion.aside>
	)
}
