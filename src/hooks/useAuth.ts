import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import {
	googleLogin,
	googleLogout,
	setLoading
} from "@/redux/features/userSlice"
import { AppDispatch } from "@/redux/store"

export default function useAuth() {
	const dispatch = useDispatch<AppDispatch>()

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

	const handleLogout = async () => {
		try {
			await auth.signOut()
			dispatch(googleLogout())
		} catch (error) {
			console.error(error)
		}
	}

	return { handleLogin, handleLogout }
}