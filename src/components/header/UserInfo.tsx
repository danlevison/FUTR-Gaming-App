import Image from "next/image"
import Link from "next/link"
import { currentUser } from "@/redux/features/authSlice"
import { useSelector } from "react-redux"
import {
	useFetchFollowersQuery,
	useFetchFollowingQuery
} from "@/redux/features/friendsApiSlice"

export default function UserInfo({
	sidebarStatus,
	nav,
	handleNav
}: {
	sidebarStatus?: boolean
	nav?: boolean
	handleNav?: () => void
}) {
	const user = useSelector(currentUser)
	const { data: followersData } = useFetchFollowersQuery(user?.uid as string)
	const { data: followingData } = useFetchFollowingQuery(user?.uid as string)

	return (
		<div className="flex items-center gap-4 md:flex-col md:gap-0 mt-5">
			<div className="flex justify-center items-center">
				<Link
					href={`/user/${user?.uid}`}
					onClick={handleNav}
					className="rounded-full p-[0.15rem] hover:bg-white duration-300"
				>
					<Image
						src={user?.avatar!}
						alt={user?.displayName || "user avatar"}
						width={53}
						height={53}
						className="rounded-full"
					/>
				</Link>
			</div>
			{(sidebarStatus || nav) && (
				<div className="flex flex-col justify-center items-center mt-2 whitespace-nowrap">
					<p className="text-sm">{user?.email}</p>
					<div className="flex items-center gap-4 text-sm">
						<p>
							{followersData?.length}
							<span className="ml-1 text-gray-400">
								{followersData?.length === 1 ? "Follower" : "Followers"}
							</span>
						</p>
						<p>
							{followingData?.length}
							<span className="ml-1 text-gray-400">Following</span>
						</p>
					</div>
					<Link
						href={`/user/${user?.uid}`}
						onClick={handleNav}
						className="border border-accentSecondary w-full text-sm md:text-base text-center rounded-md mt-2 p-1 hover:border-white duration-300"
					>
						{user?.displayName}
					</Link>
				</div>
			)}
		</div>
	)
}
