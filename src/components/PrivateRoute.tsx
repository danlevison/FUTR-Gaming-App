import { useEffect } from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@/redux/features/authSlice"
import { useSelector } from "react-redux"

export default function PrivateRoute(Component: any) {
	return function PrivaveRoute(props: any) {
		const user = useSelector(currentUser)
		useEffect(() => {
			if (!user) {
				redirect("/")
			}
		}, [user])

		return <Component {...props} />
	}
}
