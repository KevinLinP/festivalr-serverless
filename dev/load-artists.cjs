const { readFileSync } = require('fs')

class Importer {
  static loadData() {
    const festivalName = process.argv[2]
    const artistsFilePath = process.argv[3]

    const artistsString = readFileSync(artistsFilePath).toString()
    const artists = artistsString.split("\n").filter(n => n.length > 0)

    // console.log({
    //   festivalName,
    //   artistsFilePath,
    //   // artistsString,
    //   artists
    // })

    return {
      festivalName,
      artists
    }
  }

  static async import() {
    const Firestore = require('@google-cloud/firestore');

    const db = new Firestore({
      projectId: process.env.PROJECT_ID
    });

    const {festivalName, artists} = this.loadData()

    console.log({festivalName, artists})

    const festivalDoc = await this.getFestivalDoc({db, festivalName})
    await this.findOrCreateArtists({db, festivalDoc, artists})
  }

  static async getFestivalDoc({db, festivalName}) {
    const ref = db.collection('festivals');
    const snapshot = await ref.where('name', '==', festivalName).get();
    return snapshot.docs[0]
  }

  static async findOrCreateArtists({db, festivalDoc, artists}) {
    const artistsRef = db.collection('festivals').doc(festivalDoc.id).collection('artists')

    artists.forEach(async (artistName) => {
      const snapshot = await artistsRef.where('name', '==', artistName).get()

      if (!snapshot.exists) {
        artistsRef.add({
          name: artistName
        })
      }
    })
  }
} 

Importer.import()
