"use client"

import { useParams } from "next/navigation"
import { currentUser } from "@/redux/features/authSlice"
import { useSelector } from "react-redux"
import useAuth from "@/hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import WishListGames from "./components/WishlistGames"

export default function Wishlist() {
	const user = useSelector(currentUser)

	return (
		<main className="min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Wishlist
			</h1>
			<div className="mt-10">
				<WishListGames user={user} />
			</div>
		</main>
	)
}
