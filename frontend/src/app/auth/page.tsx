'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/global/AuthProvider';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const router = useRouter();
    const { login, register, guestLogin, error } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                await register(
                    formData.username,
                    formData.email,
                    formData.password
                );
            }
            router.push('/');
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const handleGuestLogin = async () => {
        try {
            await guestLogin();
            router.push('/');
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="max-w-md w-full space-y-8 p-6 bg-gray-900 rounded-xl">
                <h2 className="text-3xl font-bold text-center text-white">
                    {isLogin ? 'Sign In' : 'Create Account'}
                </h2>
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="text-white">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-800 text-white"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-800 text-white"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div>
                            <label className="text-white">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-gray-800 text-white"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                    >
                        {isLogin ? 'Sign In' : 'Register'}
                    </button>
                </form>
                {isLogin && (
                    <>
                        <div className="text-center">
                            <span className="text-gray-400">or</span>
                        </div>
                        <button
                            onClick={handleGuestLogin}
                            className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                        >
                            Continue as Guest
                        </button>
                    </>
                )}
                <div className="text-center text-gray-400">
                    {isLogin
                        ? "Don't have an account? "
                        : 'Already have an account? '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? 'Register' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
}
