import { AttendanceSubmission } from '../types/attendance';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'submissions';

export const saveSubmission = async (submission: AttendanceSubmission): Promise<void> => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), submission);
  } catch (error) {
    console.error('Error saving submission:', error);
    throw new Error('Failed to save submission');
  }
};

export const getSubmissions = async (): Promise<AttendanceSubmission[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const submissions: AttendanceSubmission[] = [];
    querySnapshot.forEach((doc) => {
      submissions.push(doc.data() as AttendanceSubmission);
    });
    return submissions;
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    return [];
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};