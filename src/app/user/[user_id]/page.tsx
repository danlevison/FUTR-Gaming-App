"use client"

import Image from "next/image"

import CollectionsSlider from "./components/CollectionsSlider"
import { useParams } from "next/navigation"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import FollowBtn from "./components/FollowBtn"
import Following from "./components/Following"
import Followers from "./components/Followers"
import WishlistSlider from "./components/WishlistSlider"
import Link from "next/link"

export default function User() {
	const user = useSelector(currentUser)
	const { user_id } = useParams()
	const { data: userData } = useFetchUsersQuery({})

	const userDetails = () => {
		return userData?.find((user) => user?.uid === user_id)
	}

	const { displayName, avatar } = userDetails() || {}

	return (
		<main className="min-h-screen w-full px-5 pt-20 pb-10 md:pt-2">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<div className="flex flex-col items-center xs:flex-row gap-2">
					<div className="order-1">
						<h1 className="font-bold uppercase text-center text-3xl sm:text-4xl md:text-5xl tracking-wider">
							{displayName}
						</h1>
						<Link
							href={`/wishlist/${user_id}`}
							className="text-lg underline"
						>
							View wishlist
						</Link>
					</div>
					{avatar && (
						<Image
							src={avatar}
							alt={displayName || "User avatar"}
							width={50}
							height={50}
							className="rounded-full"
						/>
					)}
				</div>
				<FollowBtn
					user={user}
					userParamId={user_id}
				/>
			</div>
			<CollectionsSlider />
			<Followers
				userParamId={user_id}
				userData={userData}
			/>
			<Following
				userParamId={user_id}
				userData={userData}
			/>
			{/* <WishlistSlider /> */}
		</main>
	)
}
