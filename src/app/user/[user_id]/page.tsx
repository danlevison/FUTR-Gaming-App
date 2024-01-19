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
import WishlistLink from "./components/WishlistLink"
import PageHeading from "@/components/PageHeading"
import MessageBtn from "./components/MessageBtn"

export default function User() {
	const user = useSelector(currentUser)
	const { user_id } = useParams()
	const { data: userData } = useFetchUsersQuery({})

	const userDetails = () => {
		return userData?.find((user) => user?.uid === user_id)
	}

	const { displayName, avatar } = userDetails() || {}

	return (
		<main className="w-full px-5 pt-20 pb-10 md:pt-2">
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
				<div className="flex flex-col items-center xs:flex-row gap-2 mb-3">
					<PageHeading headingText={displayName} />

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
				<div className="flex items-center gap-4">
					<FollowBtn
						user={user}
						userParamId={user_id}
					/>
					<MessageBtn
						user={user}
						userParamId={user_id}
						displayName={displayName}
						avatar={avatar}
					/>
				</div>
			</div>
			<WishlistLink userParamId={user_id} />
			<CollectionsSlider />
			<Followers
				userParamId={user_id}
				userData={userData}
			/>
			<Following
				userParamId={user_id}
				userData={userData}
			/>
		</main>
	)
}
