import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3WoIErftY_wqewKf5Xk5Po7H3wJ4XPEk",
  authDomain: "automobile-logbook.firebaseapp.com",
  projectId: "automobile-logbook",
  storageBucket: "automobile-logbook.firebasestorage.app",
  messagingSenderId: "557385396203",
  appId: "1:557385396203:web:ac7522da8881cf9154b3ae",
  measurementId: "G-GTFKRM6XFC"
}

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app)

export { db }
