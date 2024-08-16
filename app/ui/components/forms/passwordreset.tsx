'use client';

import { useState } from 'react';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from '@/app/lib/firebase/auth/auth'; 
import Link from 'next/link'; 
import { IoChevronBackOutline } from "react-icons/io5";

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    setMessage('');
    setEmailSent(false);

    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    try {
 
      const signInMethods = await fetchSignInMethodsForEmail(email);
      if (signInMethods.length === 0) {
        setMessage("This email isn't registered on InkHaven");
        setEmail('');
        return;
      }

      
      await sendPasswordResetEmail(email);
      setMessage('Password reset email sent successfully');
      setEmailSent(true);
      setEmail('');
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="w-full max-w-md bg-light-secondaryBg p-8 rounded-lg shadow-lg">
      <Link href="/signin" className="text-light-linkDefault hover:text-light-linkHover flex items-center mb-4">
        <IoChevronBackOutline className="text-light-linkDefault mr-2" />
        <span>Back</span>
      </Link>
      <h4 className="text-2xl font-bold mb-6 text-light-heading text-left">Forgot Password?</h4>
      <p className="text-light-text text-left mb-6">Enter your email address to reset your password</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-light-accentLight rounded-md"
            placeholder="Email"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-light-primary bg-light-buttonDefault hover:bg-light-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
          Reset Password
        </button>
      </form>
      {message && <p className="text-center text-light-text mt-4">{message}</p>}
      {emailSent && (
        <p className="text-center text-light-text mt-4">
          <Link href="/signin" className="text-light-linkDefault hover:text-light-linkHover">Go back to Sign In</Link>
        </p>
      )}
    </div>
  </div>
  
  );
};

export default PasswordResetForm;
