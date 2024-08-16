'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/app/ui/styles/buttons.module.css';

export const LoginButton = () => (
  <Link 
    href="/signin" 
    className={`${styles.button} ${styles.buttonPrimary} py-1 px-2 md:py-2 md:px-4`}
  >
    Sign In
  </Link>
);

export const SignupButton = () => (
  <Link 
    href="/signup" 
    className={`${styles.button} ${styles.buttonPrimary} py-1 px-2 md:py-2 md:px-4`}
  >
    Sign Up
  </Link>
);

export const GetStartedButton = () => (
  <Link 
    href="/signup" 
    className={`${styles.button} ${styles.buttonPrimary} py-1 px-2 md:py-2 md:px-4`}
  >
    Get Started
  </Link>
);

export const CreateButton = () => (
  <Link 
    href="/home/new" 
    className={`${styles.button} ${styles.buttonPrimary} py-1 px-2 md:py-2 md:px-4`}
  >
    Create
  </Link>
);

export const FormSignUpButton = () => (
  <Link 
    href="/signup" 
    className={`${styles.button} ${styles.transitionButton}`}
  >
    Sign Up
  </Link>
);

export const FormSignInButton = () => (
  <Link 
    href="/signin" 
    className={`${styles.button} ${styles.transitionButton}`}
  >
    Sign In
  </Link>
);

export const SignOutButton = () => {
 const router = useRouter();
  const handleSignOut = async () => {
    try {
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className={`${styles.button} ${styles.buttonPrimary}`}>
      Sign Out
    </button>
  );
};
