import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { googleLogin, googleLogout } from "@/redux/features/authSlice"
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
					email: result.user.email,
					avatar: result.user.photoURL
				})
			)
			const userDocRef = doc(db, "users", result.user.uid)
			const docSnap = await getDoc(userDocRef)
			if (docSnap.exists()) {
				return
			}
			await setDoc(userDocRef, {
				email: result.user.email,
				displayName: result.user.displayName,
				avatar: result.user.photoURL,
				createdAt: new Date(Timestamp.now().seconds * 1000).toString()
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
