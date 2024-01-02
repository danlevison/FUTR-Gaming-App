import Image from "next/image"
import Link from "next/link"
import { currentUser } from "@/redux/features/authSlice"
import { useSelector } from "react-redux"

export default function UserInfo({
	sidebarStatus
}: {
	sidebarStatus: boolean
}) {
	const user = useSelector(currentUser)

	return (
		<div className="mt-5 md:mt-8">
			<div className="flex justify-center items-center">
				<Link href={`/user/${user?.uid}`}>
					<Image
						src={user?.avatar!}
						alt={user?.displayName || "user avatar"}
						width={60}
						height={60}
						className="rounded-full"
					/>
				</Link>
			</div>
			{sidebarStatus && (
				<div className="flex flex-col justify-center items-center mt-2 whitespace-nowrap">
					<p className="text-sm">{user?.email}</p>
					<div className="flex items-center gap-4 text-sm">
						<p>
							0 <span className="text-gray-400">Followers</span>
						</p>
						<p>
							0 <span className="text-gray-400">Following</span>
						</p>
					</div>
					<Link
						href={`/user/${user?.uid}`}
						className="border-2 border-accentSecondary w-full text-center rounded-md mt-2 p-1"
					>
						{user?.displayName}
					</Link>
				</div>
			)}
		</div>
	)
}
