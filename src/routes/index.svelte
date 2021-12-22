<script>
  import { initializeApp } from "firebase/app"
  import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore"

  let festival = null

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

  const getFestival = async function () {
    const festivalsCol = collection(db, 'festivals')
    const festivalsSnapshot = await getDocs(festivalsCol)
    const festivalDoc = festivalsSnapshot.docs[0]

    festival = Object.assign(
      {id: festivalDoc.id},
      festivalDoc.data(),
    )

    console.log(festival)
  }

  getFestival()
</script>

{#if festival}
  <h1>{ festival?.name}</h1>

  <ul>
    {#each festival.artists as artist}
      <li>{artist}</li>
    {/each}
  </ul>
{/if}
