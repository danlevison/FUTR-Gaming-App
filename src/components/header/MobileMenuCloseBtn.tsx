"use client"

import { MdClose } from "react-icons/md"
import { useDispatch } from "react-redux"
import { setSidebarClose } from "@/redux/features/sidebarSlice"

export default function MobileMenuCloseBtn() {
	const dispatch = useDispatch()
	return (
		<button
			onClick={() => dispatch(setSidebarClose())}
			aria-label="Close menu"
		>
			<MdClose size={30} />
		</button>
	)
}
