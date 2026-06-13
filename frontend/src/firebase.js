import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCHC4EkV7kRT7Chty9shycGVshURZLearg",
  authDomain: "dsa-tracker-20df2.firebaseapp.com",
  projectId: "dsa-tracker-20df2",
  storageBucket: "dsa-tracker-20df2.firebasestorage.app",
  messagingSenderId: "194066903357",
  appId: "1:194066903357:web:0bb9a09e54ea10bbba9554"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()