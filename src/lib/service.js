import { db } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const updateData = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    console.log('Document updated with ID: ', id);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const deleteData = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const getAllData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (e) {
    console.error('Error getting documents: ', e);
  }
};
