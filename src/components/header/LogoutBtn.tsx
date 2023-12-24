import { CiLogout } from "react-icons/ci"
import useAuth from "@/hooks/useAuth"

export default function LogoutBtn({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	const { handleLogout } = useAuth()
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
