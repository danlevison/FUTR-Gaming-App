"use client"

import Image from "next/image"
import CollectionsSlider from "./components/CollectionsSlider"
import { useParams } from "next/navigation"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"

export default function User() {
	const { data: userData } = useFetchUsersQuery({})
	const { user_id } = useParams()

	const userDetails = () => {
		return userData?.find((user) => user?.uid === user_id)
	}

	const { displayName, avatar } = userDetails() || {}
	return (
		<main className="flex flex-col min-h-screen w-full px-5 pt-20 pb-10 md:pt-2">
			<div className="flex items-center gap-2">
				<h1 className="order-1 font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
					{displayName}
				</h1>
				<Image
					src={avatar!}
					alt={displayName || "User avatar"}
					width={50}
					height={50}
					className="rounded-full"
				/>
			</div>
			<CollectionsSlider />
		</main>
	)
}
