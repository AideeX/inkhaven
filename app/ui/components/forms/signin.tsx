'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaTwitter, FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmail, signInWithGoogle, signInWithFacebook, signInWithTwitter } from '@/app/lib/firebase/auth/auth';
import { literata } from '@/app/ui/styles/fonts';
import { FormSignUpButton,  } from '@/app/ui/components/general/buttons';
import Image from 'next/image';
import Link from 'next/link';


const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
  

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmail(email, password);
            router.push('/interests');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.push('/home');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            await signInWithFacebook();
            router.push('/home');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleTwitterSignIn = async () => {
        try {
            await signInWithTwitter();
            router.push('/home');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

  

    return (
      <div className="relative flex flex-col md:flex-row justify-center items-center h-auto md:min-h-screen w-full max-w-screen-md mx-auto bg-none md:bg-[url('/purple-bg.PNG')] bg-cover bg-center rounded-lg shadow-2xl">
    
    <Link href='/' className="absolute top-0 left-0 md:block hidden">
        <Image src="/darkmode.svg" alt="InkHaven" width={150} height={50} />
    </Link>

    <div className="hidden md:flex flex-col w-1/2 justify-center items-center text-center p-8">
        <h2 className={`text-2xl md:text-3xl font-bold text-dark-heading mb-6 ${literata.className}`}>Join InkHaven</h2>
        <p className="text-lg text-dark-text mb-4">Signup to continue</p>
        <div>
            <FormSignUpButton />
        </div>
    </div>

    <div className="flex flex-col w-full h-full md:w-1/2 p-6 md:p-8 bg-light-secondaryBg rounded-lg md:rounded-r-lg shadow-lg md:m-0 md:min-h-screen">
        <h1 className={`text-2xl md:text-3xl text-center font-bold mb-6 text-light-heading ${literata.className}`}>Welcome Back to InkHaven</h1>
        <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-light-text">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="janesmith@example.com" className="w-full p-2 border border-light-accentLight rounded-md" />
            </div>
            <div className="relative">
                <label htmlFor="password" className="block text-light-text">Password</label>
                <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="w-full p-2 border border-light-accentLight rounded-md" />
                <div className="absolute bottom-3 right-0 pr-3 flex items-center text-sm leading-5">
                    <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                        {showPassword ? <FaEyeSlash className="text-light-accentMedium text-center" /> : <FaEye className="text-light-accentMedium" />}
                    </button>
                </div>
            </div>
            <div className="text-right">
                <Link href='/password-reset'><p className="text-light-linkDefault hover:text-light-linkHover">Forgot Password?</p></Link>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-light-primary bg-light-buttonDefault hover:bg-light-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">Sign In</button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </form>
        <div className="text-center my-4">
            <p className="text-sm text-light-text">or</p>
        </div>
        <div className="space-y-2">
            <button onClick={handleGoogleSignIn} className="w-full flex justify-center py-1 px-2 sm:py-2 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-light-heading bg-light-primary hover:bg-light-accentLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
                <FaGoogle className="mr-2 text-red-600" /> Sign In with Google
            </button>
            <button onClick={handleFacebookSignIn} className="w-full flex justify-center py-1 px-2 sm:py-2 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-light-heading bg-light-primary hover:bg-light-accentLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
                <FaFacebook className="mr-2 text-blue-600" /> Sign In with Facebook
            </button>
            <button onClick={handleTwitterSignIn} className="w-full flex justify-center py-1 px-2 sm:py-2 sm:px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-light-heading bg-light-primary hover:bg-light-accentLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium">
                <FaTwitter className="mr-2 text-blue-400" /> Sign In with Twitter
            </button>
        </div>
        <p className="mt-4 text-center text-sm text-light-text md:hidden">Don&apos;t have an account? <Link href="/signup" className="text-light-linkDefault hover:text-light-linkHover">Sign Up</Link></p>
    </div>
</div>

  
    );
};

export default SignInForm;
