"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setSidebarClose } from "@/redux/features/sidebarSlice"
import { RootState } from "@/redux/store"
import Logo from "../Logo"
import SocialLinks from "../../SocialLinks"
import NavLinks from "../NavLinks"
import CollapseSidebarBtn from "./CollapseSidebarBtn"

export default function Nav() {
	const sidebarStatus = useSelector(
		(state: RootState) => state.sidebar.sidebarStatus
	)
	const dispatch = useDispatch()
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : null
	)
	const isMobileScreen = windowWidth && windowWidth <= 767

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
			animate={sidebarStatus ? "open" : "closed"}
			className={`hidden fixed top-0 h-14 z-50 md:flex justify-between items-center bg-foreground p-4 shadow-2xl backdrop-blur-2xl backdrop-filter md:sticky md:h-screen md:overflow-y-auto md:overflow-x-hidden md:flex-col md:justify-start md:gap-4 ${
				sidebarStatus ? "md:items-start" : "md:items-center"
			}`}
		>
			<Logo sidebarStatus={sidebarStatus} />
			<NavLinks sidebarStatus={sidebarStatus} />
			<SocialLinks sidebarStatus={sidebarStatus} />
			<CollapseSidebarBtn sidebarStatus={sidebarStatus} />
		</motion.aside>
	)
}
