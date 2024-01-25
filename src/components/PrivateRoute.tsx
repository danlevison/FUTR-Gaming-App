import { useEffect } from "react"
import { redirect } from "next/navigation"
import useUser from "@/hooks/useUser"

export default function PrivateRoute(Component: any) {
	return function PrivaveRoute(props: any) {
		const user = useUser()
		useEffect(() => {
			if (!user) {
				redirect("/")
			}
		}, [user])

		return <Component {...props} />
	}
}
