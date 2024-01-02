"use client"

import { useEffect } from "react"
import Image from "next/image"
import CollectionsSlider from "./components/CollectionsSlider"
import { useParams } from "next/navigation"
import { currentUser } from "@/redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useFetchUsersQuery } from "@/redux/features/usersApiSlice"
import { setUserId } from "@/redux/features/userProfileIdSlice"

export default function User() {
	const user = useSelector(currentUser)
	const { data: userData } = useFetchUsersQuery({})
	const { user_id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setUserId(user_id))
	}, [dispatch, user_id])

	const userDetails = () => {
		return userData?.find((user) => user?.uid === user_id)
	}

	const { uid, displayName, avatar } = userDetails() || {}
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
