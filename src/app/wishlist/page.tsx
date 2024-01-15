"use client"

import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import { useToast } from "@/components/ui/use-toast"
import { useSelector } from "react-redux"
import { currentUser } from "@/redux/features/authSlice"
import { useEffect } from "react"
import PageHeading from "@/components/PageHeading"

export default function WishListPage() {
	const { handleLogin } = useAuth()
	const user = useSelector(currentUser)
	const { toast } = useToast()
	const { push } = useRouter()

	const handleSignIn = async () => {
		try {
			await handleLogin()
		} catch (error) {
			console.error(error)
			toast({
				variant: "destructive",
				description: "Error: Failed to sign you in, please try again."
			})
		}
	}

	useEffect(() => {
		if (user) {
			push(`/wishlist/${user.uid}`)
		}
	}, [user, push])

	return (
		<main className="w-full mx-auto px-5 pt-20 pb-10 md:pt-2">
			<PageHeading headingText="Wishlist" />
			<div className="mt-10">
				<h2 className="text-2xl sm:text-3xl mb-2">Your Wishlist</h2>
				<div className="flex flex-col justify-center items-center bg-foreground w-full h-32 rounded-md">
					<p className="font-bold text-lg">Sign in to create your wishlist</p>
					<div className="flex justify-center w-full max-w-[200px] mt-2">
						<button
							onClick={handleSignIn}
							className="flex justify-center items-center gap-2 w-full bg-gray-500 p-2 rounded-md hover:opacity-80"
						>
							Sign in with Google <FcGoogle size={30} />
						</button>
					</div>
				</div>
			</div>
		</main>
	)
}
