"use client"

import { useEffect } from "react"
import { currentUser } from "@/redux/features/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { setUserId } from "@/redux/features/userProfileIdSlice"
import useAuth from "@/hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import AddNewCollection from "./components/AddNewCollection"
import CollectionGrid from "./components/CollectionGrid"

export default function Collections() {
	const user = useSelector(currentUser)
	const dispatch = useDispatch()
	const { handleLogin } = useAuth()

	useEffect(() => {
		dispatch(setUserId(user?.uid))
	}, [dispatch, user?.uid])

	return (
		<main className="min-h-screen w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Collections
			</h1>

			<div className="mt-10">
				<h2 className="text-2xl sm:text-3xl mb-2">Your Collections</h2>
				{user && <AddNewCollection user={user} />}
				{!user ? (
					<div className="flex flex-col justify-center items-center bg-foreground w-full h-32 rounded-md">
						<p className="font-bold text-lg">Sign in to create collections</p>
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
					<CollectionGrid user={user} />
				)}
			</div>
		</main>
	)
}
