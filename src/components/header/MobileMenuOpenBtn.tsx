"use client"

import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { setSidebarOpen } from "@/redux/features/sidebarSlice"

export default function MobileMenuOpenBtn() {
	const dispatch = useDispatch()

	return (
		<button
			onClick={() => dispatch(setSidebarOpen())}
			aria-label="Open menu"
			className="md:hidden text-white"
		>
			{<HiOutlineMenuAlt3 size={30} />}
		</button>
	)
}
