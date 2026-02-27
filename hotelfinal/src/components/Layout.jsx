import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-surface-50">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                {/* Abstract decorative background blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-success-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 w-full">
                    {children}
                </div>
            </main>
            <footer className="bg-white border-t border-surface-100 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center h-full">
                    <p className="text-center text-sm text-surface-800 font-medium">
                        &copy; {new Date().getFullYear()} Better Homes Hotel. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
