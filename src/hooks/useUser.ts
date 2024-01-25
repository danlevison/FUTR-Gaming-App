import { currentUser } from "@/redux/features/authSlice"
import { useSelector } from "react-redux"

export default function useUser() {
	const user = useSelector(currentUser)

	return user
}
