import { auth } from "@/config/firebase"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { googleLogout } from "@/redux/features/userSlice"
import { CiLogout } from "react-icons/ci"

export default function LogoutBtn({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	const dispatch = useDispatch<AppDispatch>()
	const handleLogout = async () => {
		try {
			await auth.signOut()
			dispatch(googleLogout())
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<button
			onClick={handleLogout}
			className="flex justify-center items-center gap-2"
		>
			<CiLogout size={25} />
			{(sidebarStatus || nav) && (
				<span className="whitespace-nowrap">Sign out</span>
			)}
		</button>
	)
}
