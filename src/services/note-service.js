import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase-config/firebaseConfig"


const COLLECTION_NAME = 'notes'


// creating a new note
export const createNote = (note) => {
    return addDoc(collection(db, COLLECTION_NAME), note)

};


// get all notes of perticular user using there userId
export const getNoteById = async (userId) => {
    console.log("Fetching notes for user ID:", userId);

    try {

        const notesQuery = query(
            collection(db, COLLECTION_NAME),
            where("id", "==", userId)
        );


        const querySnapshot = await getDocs(notesQuery);


        if (querySnapshot.empty) {
            console.log("No notes found for this user");
            return [];
        }


        const notes = [];
        querySnapshot.forEach((doc) => {
            notes.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log("Found notes:", notes);
        return notes;

    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};


// delete note using userId and noteId 
export const deleteNote = async (userId, noteId) => {
    try {

        const notesRef = collection(db, COLLECTION_NAME);
        const q = query(
            notesRef,
            where('id', '==', userId),
            where('note.noteId', '==', noteId)
        );

        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if we found the document
        if (querySnapshot.empty) {
            console.log('No matching document found');
            return false;
        }


        const deletePromises = querySnapshot.docs.map(async (document) => {
            await deleteDoc(doc(db, COLLECTION_NAME, document.id));
        });

        await Promise.all(deletePromises);
        console.log('Note deleted successfully');
        return true;

    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};



export const getSingleNoteById = async (userId, noteId) => {
    try {
        const notesRef = collection(db, COLLECTION_NAME);
        const q = query(
            notesRef,
            where('id', '==', userId),
            where('note.noteId', '==', noteId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No matching document found');
            return null;
        }


        const docData = querySnapshot.docs[0].data();
        return {
            id: querySnapshot.docs[0].id,
            ...docData
        };

    } catch (error) {
        console.error('Error fetching note:', error);
        throw error;
    }
};


export const updateNoteById = async (userId, noteId, updatedNoteData) => {
    try {
        const notesRef = collection(db, COLLECTION_NAME);
        const q = query(
            notesRef,
            where('id', '==', userId),
            where('note.noteId', '==', noteId)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No matching document found');
            return null;
        }

        // Get the document reference
        const docRef = doc(db, COLLECTION_NAME, querySnapshot.docs[0].id);

        // Update the document
        await updateDoc(docRef, updatedNoteData);

        // Return the updated document
        const updatedDoc = await getDoc(docRef);
        return {
            id: updatedDoc.id,
            ...updatedDoc.data()
        };

    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

