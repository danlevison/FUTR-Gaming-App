"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Logo from "../Logo"
import UserLinks from "../UserLinks"
import NavLinks from "../NavLinks"
import CollapseSidebarBtn from "./CollapseSidebarBtn"
import LoginBtn from "../LoginBtn"
import LogoutBtn from "../LogoutBtn"
import UserInfo from "../UserInfo"
import PortfolioLink from "../PortfolioLink"
import useUser from "@/hooks/useUser"

export default function Sidebar() {
	const user = useUser()
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
			className={`hidden fixed top-0 left-0 h-full z-50 md:flex justify-between items-center bg-foreground px-2 py-4 shadow-2xl backdrop-blur-2xl backdrop-filter md:sticky md:h-screen md:overflow-y-auto md:overflow-x-hidden md:flex-col md:justify-start md:gap-4 ${
				sidebar ? "md:items-start px-4" : "md:items-center"
			}`}
		>
			<Logo sidebarStatus={sidebar} />
			{user && <UserInfo sidebarStatus={sidebar} />}
			<UserLinks sidebarStatus={sidebar} />
			<NavLinks sidebarStatus={sidebar} />
			<CollapseSidebarBtn
				sidebarStatus={sidebar}
				setSidebar={setSidebar}
			/>
			{user ? (
				<LogoutBtn sidebarStatus={sidebar} />
			) : (
				<LoginBtn sidebarStatus={sidebar} />
			)}
			<PortfolioLink sidebarStatus={sidebar} />
		</motion.aside>
	)
}
