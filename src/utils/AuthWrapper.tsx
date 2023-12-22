"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { googleLogin, googleLogout } from "@/redux/features/userSlice"
import { AppDispatch } from "@/redux/store"

export default function AuthWrapper({
	children
}: {
	children: React.ReactNode
}) {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(
					googleLogin({
						uid: user.uid,
						displayName: user.displayName,
						email: user.email
					})
				)
			} else {
				dispatch(googleLogout())
			}
		})
		return () => unsubscribe()
	}, [dispatch])

	return <>{children}</>
}
