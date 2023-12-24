import { FcGoogle } from "react-icons/fc"
import useAuth from "@/hooks/useAuth"

export default function LoginBtn({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	const { handleLogin } = useAuth()

	return (
		<button
			onClick={handleLogin}
			className="flex justify-center items-center gap-2 w-full bg-gray-500 p-2 rounded-md hover:opacity-80"
		>
			<FcGoogle size={25} />
			{(sidebarStatus || nav) && (
				<span className="text-sm whitespace-nowrap">Sign in with Google</span>
			)}
		</button>
	)
}
