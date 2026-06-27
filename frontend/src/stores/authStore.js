import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const error = ref(null);
  const isAuthReady = ref(false); // verificam daca e logat user-ul

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    isAuthReady.value = true;
  });

  const login = async (email, password) => {
    error.value = null;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = "Email sau parola incorecte.";
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Eroare la deconectare:", err);
    }
  };

  return { user, error, isAuthReady, login, logout };
});