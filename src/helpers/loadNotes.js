import { db, collection, getDocs } from "../firebase/firebaseConfig"


export const loadNotes = async (uid) => {
    const noteSnapshot = await getDocs(collection(db, `${uid}/journal/notes`));
    const notes = []

    noteSnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
        notes.push({
            id: doc.id,
            ...doc.data(),
        })
    })

    return notes
}