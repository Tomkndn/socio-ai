'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { Button } from '../ui/button';
import { Bell, Menu, Search, User } from 'lucide-react';
import { Input } from '../ui/input';
import { useAuth } from './AuthProvider';
import Link from 'next/link';

const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = async () => {
        try {
            logout();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <header className="bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            SocialDash
                        </div>
                    </div>

                    <div className="flex-1 mx-8">
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Search content..."
                                className="w-full pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-blue-500 rounded-full"></span>
                        </Button> */}

                        {user ? (
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <User className="h-5 w-5" />
                                    {user.username}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
                                {user && (
                                    <>
                                        <DropdownMenuLabel className="text-gray-300">
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-gray-800" />
                                        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white">
                                            <button
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/auth" className='text-gray-400 hover:text-white'>
                                Login
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;