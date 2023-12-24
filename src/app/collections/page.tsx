"use client"

import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import useAuth from "@/hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import NewCollectionForm from "./components/NewCollectionForm"
import CollectionCard from "./components/CollectionCard"

export default function Collections() {
	const user = useSelector((state: RootState) => state.data.user.user)
	const { handleLogin } = useAuth()
	return (
		<main className="min-h-screen w-full mx-auto px-5 py-20">
			<h1 className="font-bold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider">
				Collections
			</h1>
			<div className="mt-20">
				<h2 className="text-2xl sm:text-3xl mb-2">Your Collections</h2>
				{user && <NewCollectionForm />}
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
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<CollectionCard user={user} />
					</div>
				)}
			</div>
		</main>
	)
}
