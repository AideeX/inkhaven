'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaTwitter, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signUpWithEmail, signInWithGoogle, signInWithFacebook, signInWithTwitter } from '@/app/lib/firebase/auth/auth';
import { literata } from '@/app/ui/styles/fonts';
import { FormSignInButton } from '@/app/ui/components/general/buttons';
import Image from 'next/image';
import Link from 'next/link';


const SignUpForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ email?: string, password?: string, confirmPassword?: string, termsAccepted?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
  

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const validateForm = () => {
        const errors: { email?: string, password?: string, confirmPassword?: string, termsAccepted?: string } = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!termsAccepted) {
            errors.termsAccepted = 'You must accept the terms and conditions';
        }
        return errors;
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        try {
            await signUpWithEmail(email, password, firstName, lastName, termsAccepted);
            router.push('/signin');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithGoogle();
            router.push('/interests');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleFacebookSignUp = async () => {
        try {
            await signInWithFacebook();
            router.push('/interests');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleTwitterSignUp = async () => {
        try {
            await signInWithTwitter();
            router.push('/interests');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const checkPasswordsMatch = () => {
        if (password === confirmPassword) {
          setValidationErrors(prevErrors => {
            const { confirmPassword, ...rest } = prevErrors;
            return rest;
          });
        }
      };
    
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        checkPasswordsMatch();
      };
    
      const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        checkPasswordsMatch();
      };
    

    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTermsAccepted(e.target.checked);
        if (e.target.checked && validationErrors.termsAccepted) {
          setValidationErrors(prevErrors => {
            const { termsAccepted, ...rest } = prevErrors;
            return rest;
          });
        }
      };
      

   

    return (
        <div className="relative flex flex-col md:flex-row justify-center items-center min-h-screen w-2/3 mx-auto bg-[url('/purple-bg2.PNG')] bg-cover bg-center rounded-lg shadow-2xl">
  <div className="flex flex-col w-full md:w-1/2 p-8 bg-light-secondaryBg rounded-lg md:rounded-l-lg shadow-lg">
    <div className="w-full h-full">
    <Link href='/' className="hidden md:block absolute right-4">
  <Image src="/darkmode.svg" alt="InkHaven" width={150} height={50} />
</Link>
      <h1 className={`text-3xl font-bold text-center mb-6 ${literata.className}`}>
        Join the InkHaven Community
      </h1>
      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="first-name" className="block text-light-text">First Name</label>
            <input type="text" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border border-light-accentLight rounded-md" />
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <label htmlFor="last-name" className="block text-light-text">Last Name</label>
            <input type="text" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border border-light-accentLight rounded-md" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-light-text">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="janesmith@example.com" className="w-full p-2 border border-light-accentLight rounded-md" />
          {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-light-text">Password</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} placeholder="********" className="w-full p-2 border border-light-accentLight rounded-md" />
          <div className="absolute bottom-3 right-0 pr-3 flex items-center text-sm leading-5">
            <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
              {showPassword ? <FaEyeSlash className="text-light-accentMedium" /> : <FaEye className="text-light-accentMedium" />}
            </button>
          </div>
          {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
        </div>
        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-light-text">Confirm Password</label>
          <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="********" className="w-full p-2 border border-light-accentLight rounded-md" />
          <div className="absolute bottom-3 right-0 pr-3 flex items-center text-sm leading-5">
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="focus:outline-none">
              {showConfirmPassword ? <FaEyeSlash className="text-light-accentMedium" /> : <FaEye className="text-light-accentMedium" />}
            </button>
          </div>
          {validationErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>}
        </div>
        <div className="flex items-start">
          <input type="checkbox" name="terms" checked={termsAccepted} onChange={handleTermsChange} className="h-4 w-4 text-light-accentMedium border-light-accentLight rounded" />
          <p className="ml-2 text-sm text-light-text">
            By signing up, you are agreeing to our{' '}
            <Link href="#" className="text-light-linkDefault hover:text-light-linkHover">privacy policy</Link>,{' '}
            <Link href="#" className="text-light-linkDefault hover:text-light-linkHover">terms of use</Link>, and{' '}
            <Link href="#" className="text-light-linkDefault hover:text-light-linkHover">code of conduct</Link>.
          </p>
          {validationErrors.termsAccepted && <p className="text-red-500 text-sm mt-1">{validationErrors.termsAccepted}</p>}
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-light-primary bg-light-buttonDefault hover:bg-light-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
          Sign Up
        </button>
      </form>
      <div className="text-center my-4">
        <p className="text-sm text-light-text">or</p>
      </div>
      <div className="space-y-2">
             <button onClick={handleGoogleSignUp} className="w-full flex justify-center py-1 px-2 sm:py-2 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-light-heading bg-light-primary hover:bg-light-accentLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
          <FaGoogle className="mr-2 text-red-600" /> Sign Up with Google
        </button>
        <button onClick={handleFacebookSignUp} className="w-full flex justify-center py-1 px-2 sm:py-2 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-light-heading bg-light-primary hover:bg-light-accentLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
          <FaFacebook className="mr-2 text-blue-600" /> Sign Up with Facebook
        </button>
        <button onClick={handleTwitterSignUp} className="w-full flex justify-center py-1 px-2 sm:py-2 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-light-heading bg-light-primary hover:bg-light-accentLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
          <FaTwitter className="mr-2 text-blue-400" /> Sign Up with Twitter
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-light-text md:hidden">
        Already have an account? <Link href="/signin" className="text-light-linkDefault hover:text-light-linkHover">Sign in</Link>
      </p>
    </div>
  </div>

  
  <div className="hidden md:flex flex-col w-1/2 justify-center items-center mb-64 text-center p-8">
    <h2 className={`text-3xl font-bold text-white mb-6 ${literata.className}`}>
      Welcome Back to InkHaven
    </h2>
    <p className="text-lg text-white text-center mb-4">Sign in to your account to continue</p>
    <FormSignInButton />
  </div>
</div>

    

    );
};

export default SignUpForm;
