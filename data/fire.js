import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';  // Import Realtime Database

// Firebase config của bạn (Lấy từ Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAaBWLvUM2GNZzzaOEeSeJfFHxDuWhcoMU",
    authDomain: "todo-app-3bdfa.firebaseapp.com",
    databaseURL: "https://todo-app-3bdfa-default-rtdb.firebaseio.com",  // Realtime Database URL
    projectId: "todo-app-3bdfa",
    storageBucket: "todo-app-3bdfa.firebasestorage.app",
    messagingSenderId: "761334766020",
    appId: "1:761334766020:web:449203d3f6d9e72ec46c91"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Các hàm CRUD sử dụng Firestore

// Thêm task mới vào Firestore
export const addTask = async (task) => {
  try {
    const docRef = await firestore().collection('tasks').add(task);
    return { ...task, id: docRef.id }; // Trả về task mới với id của Firestore
  } catch (error) {
    console.error('Error adding task: ', error);
    throw new Error('Error adding task');
  }
};

// Lấy danh sách task từ Firestore
export const getTasks = async () => {
  try {
    const snapshot = await firestore().collection('tasks').get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error getting tasks: ', error);
    throw new Error('Error getting tasks');
  }
};

// Cập nhật task vào Firestore
export const updateTask = async (task) => {
  try {
    await firestore().collection('tasks').doc(task.id).update(task);
  } catch (error) {
    console.error('Error updating task: ', error);
    throw new Error('Error updating task');
  }
};

// Xóa task khỏi Firestore
export const deleteTask = async (taskId) => {
  try {
    await firestore().collection('tasks').doc(taskId).delete();
  } catch (error) {
    console.error('Error deleting task: ', error);
    throw new Error('Error deleting task');
  }
};

// Các hàm CRUD sử dụng Realtime Database

// Lấy danh sách task từ Realtime Database
export const getTasksFromFirebase = async () => {
    try {
      const tasksSnapshot = await database().ref('/tasks').once('value');
      const tasks = tasksSnapshot.val();
      return tasks ? Object.keys(tasks).map(key => ({
        id: key,
        ...tasks[key]
      })) : [];
    } catch (error) {
      console.error('Error getting tasks from Firebase Realtime Database: ', error);
      throw new Error('Error getting tasks from Firebase');
    }
};
