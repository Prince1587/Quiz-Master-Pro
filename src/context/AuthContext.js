import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Set persistence on mount
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log('Persistence set successfully');
      })
      .catch((error) => {
        console.error('Persistence error:', error);
      });
  }, []);

  // Signup function with EMAIL VERIFICATION
  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name
      await updateProfile(user, { displayName: name });

      // Send email verification
      await sendEmailVerification(user, {
        url: window.location.origin + '/auth', // Redirect URL after verification
        handleCodeInApp: true
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        name: name,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        quizzesTaken: 0,
        totalScore: 0
      });

      console.log('Verification email sent to:', email);
      
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login function with EMAIL VERIFICATION CHECK
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('Attempting login...');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if email is verified
      if (!user.emailVerified) {
        await signOut(auth); // Logout unverified user
        throw new Error('EMAIL_NOT_VERIFIED');
      }

      console.log('Login successful:', userCredential.user.email);
      
      // Wait for auth state to update
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          if (authUser) {
            console.log('Auth state updated');
            unsubscribe();
            resolve(authUser);
          }
        });
        
        setTimeout(() => {
          unsubscribe();
          resolve(userCredential.user);
        }, 2000);
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In function
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      console.log('Google sign-in successful:', user.email);

      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'User',
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
          emailVerified: true, // Google accounts are pre-verified
          provider: 'google',
          quizzesTaken: 0,
          totalScore: 0
        });
      }

      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user, {
          url: window.location.origin + '/auth',
          handleCodeInApp: true
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get user data from Firestore
  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    console.log('Setting up auth listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? user.email : 'No user');
      
      if (user) {
        try {
          // User is signed in
          const userData = await getUserData(user.uid);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName || userData?.name || 'User',
            photoURL: user.photoURL || userData?.photoURL || null,
            emailVerified: user.emailVerified,
            ...userData
          });
        } catch (error) {
          console.error('Error loading user data:', error);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'User',
            photoURL: user.photoURL || null,
            emailVerified: user.emailVerified
          });
        }
      } else {
        // User is signed out
        setCurrentUser(null);
      }
      
      setLoading(false);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    resendVerificationEmail,
    loading,
    getUserData
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};