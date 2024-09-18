import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Book } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold mb-8 text-indigo-800 flex items-center justify-center">
                    <Book className="mr-4 text-indigo-600" size={48} />
                    Bibliothèque Virtuelle
                </h1>
                <p className="text-xl text-indigo-700 mb-12 max-w-2xl">
                    Bienvenue dans votre espace littéraire personnel. Explorez, gérez et découvrez de nouveaux horizons à travers vos lectures.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
                    <Link to="/login" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
                        <LogIn className="mr-3" size={24} />
                        Se connecter
                    </Link>
                    <Link to="/register" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full hover:from-green-600 hover:to-green-800 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
                        <UserPlus className="mr-3" size={24} />
                        S'inscrire
                    </Link>
                </div>
            </div>
        </div>
    );
};