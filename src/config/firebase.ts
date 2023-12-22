// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyAfPUHSJ0HzAhpTfPuF5-JN4aUVqxL8bIU",
	authDomain: "futr-gaming.firebaseapp.com",
	projectId: "futr-gaming",
	storageBucket: "futr-gaming.appspot.com",
	messagingSenderId: "79376904819",
	appId: "1:79376904819:web:95efcf875ca29c2de57006"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
