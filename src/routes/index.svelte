<script>
  import { initializeApp } from "firebase/app"
  import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

  let festivalName = ''

  const firebaseConfig = {
    apiKey: "AIzaSyDa0OU4foC1xhjQTko6PyaEbKYmw7pAEFQ",
    authDomain: "festivalr-81ec9.firebaseapp.com",
    projectId: "festivalr-81ec9",
    storageBucket: "festivalr-81ec9.appspot.com",
    messagingSenderId: "938355140148",
    appId: "1:938355140148:web:7f498da46211cf4c044c61"
  }
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const getFestivals = async function () {
    const festivalsCol = collection(db, 'festivals')
    const festivalsSnapshot = await getDocs(festivalsCol)
    const festivals = festivalsSnapshot.docs.map(doc => doc.data())
    festivalName = festivals[0].name
  }

  getFestivals()
</script>

<h1>{ festivalName }</h1>
