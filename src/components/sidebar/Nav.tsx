"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setSidebarClose, setSidebarOpen } from "@/redux/features/sidebarSlice"
import { RootState } from "@/redux/store"
import { pageRoutes } from "@/lib/routes"
import { usePathname } from "next/navigation"
import Logo from "./Logo"
import SocialLinks from "./SocialLinks"
import NavLinks from "./NavLinks"

export default function Nav() {
	const sidebarStatus = useSelector(
		(state: RootState) => state.sidebar.sidebarStatus
	)
	const dispatch = useDispatch()
	const pathname = usePathname()
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : null
	)
	const isMediumScreen = windowWidth && windowWidth >= 768

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			if (windowWidth && windowWidth <= 767) {
				dispatch(setSidebarClose())
			}
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [dispatch, windowWidth])

	const getNavWidth = () => {
		if (sidebarStatus && isMediumScreen) {
			return "200px"
		} else if (!sidebarStatus && isMediumScreen) {
			return "70px"
		} else {
			return "100%"
		}
	}

	return (
		<motion.nav
			layout
			initial="initial"
			animate={{
				width: getNavWidth(),
				transition: {
					duration: 0.5,
					type: "spring",
					damping: 10
				}
			}}
			className={`fixed top-0 z-50 flex justify-between items-center bg-[#131927] p-4 shadow-2xl backdrop-blur-2xl backdrop-filter md:static md:left-6 md:h-screen md:flex-col md:justify-start md:gap-4 ${
				sidebarStatus ? "md:w-fit md:items-start" : "md:w-20 md:items-center"
			}`}
		>
			<Logo sidebarStatus={sidebarStatus} />

			<NavLinks sidebarStatus={sidebarStatus} />

			<SocialLinks sidebarStatus={sidebarStatus} />

			<button
				type="button"
				onClick={
					sidebarStatus
						? () => dispatch(setSidebarClose())
						: () => dispatch(setSidebarOpen())
				}
				className={`hidden transition-all duration-300 md:mt-auto md:gap-2 ${
					sidebarStatus ? "md:flex md:items-center" : "md:inline-block"
				} `}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					className={`h-6 w-6 fill-secondary transition-all duration-300 ${
						sidebarStatus && "rotate-180"
					}`}
				>
					<path
						fillRule="evenodd"
						d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
						clipRule="evenodd"
					/>
				</svg>

				<span
					className={`hidden text-body-1 text-white ${
						sidebarStatus ? "md:inline-block" : "md:hidden"
					}`}
				>
					Collapse
				</span>
			</button>
		</motion.nav>
	)
}
