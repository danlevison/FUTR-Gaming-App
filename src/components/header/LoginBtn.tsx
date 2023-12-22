import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { googleLogin } from "@/redux/features/userSlice"

export default function LoginBtn({
	sidebarStatus,
	nav
}: {
	sidebarStatus?: boolean
	nav?: boolean
}) {
	const dispatch = useDispatch()
	const handleLogin = async () => {
		try {
			const googleProvider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, googleProvider)
			dispatch(
				googleLogin({
					uid: result.user.uid,
					displayName: result.user.displayName,
					email: result.user.email
				})
			)
			const userDocRef = doc(db, "users", result.user.uid)
			const docSnap = await getDoc(userDocRef)
			if (docSnap.exists()) {
				return
			}
			await setDoc(userDocRef, {
				email: result.user.email,
				createdAt: serverTimestamp()
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<button
			onClick={handleLogin}
			className="flex justify-center items-center gap-2 w-full bg-gray-500 p-2 rounded-md hover:opacity-80"
		>
			<FcGoogle size={25} />
			{(sidebarStatus || nav) && (
				<span className="text-sm whitespace-nowrap">Sign in with Google</span>
			)}
		</button>
	)
}
