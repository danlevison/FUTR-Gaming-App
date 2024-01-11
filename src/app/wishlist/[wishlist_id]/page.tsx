"use client"

import { currentUser } from "@/redux/features/authSlice"
import { useSelector } from "react-redux"
import useAuth from "@/hooks/useAuth"
import { FcGoogle } from "react-icons/fc"

export default function Wishlist() {
	const user = useSelector(currentUser)
	const { handleLogin } = useAuth()
	return (
		<main className="min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Wishlist
			</h1>
			<div className="mt-10">
				<h2 className="text-2xl sm:text-3xl mb-2">Your Wishlist</h2>

				{!user ? (
					<div className="flex flex-col justify-center items-center bg-foreground w-full h-32 rounded-md">
						<p className="font-bold text-lg">Sign in to add to your wishlist</p>
						<div className="flex justify-center w-full max-w-[200px] mt-2">
							<button
								onClick={handleLogin}
								className="flex justify-center items-center gap-2 w-full bg-gray-500 p-2 rounded-md hover:opacity-80"
							>
								Sign in with Google <FcGoogle size={30} />
							</button>
						</div>
					</div>
				) : (
					<div>* wishlist games go here *</div>
				)}
			</div>
		</main>
	)
}
