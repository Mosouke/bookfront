import React, { useState, useEffect } from 'react';
import { Book, Plus, UserPlus, Edit, Trash2 } from 'lucide-react';
import AddAuthor from '../components/AddAuthor';
import AddBookForm from '../components/AddBookForm';

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isAuthorFormOpen, setIsAuthorFormOpen] = useState(false);
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState('');
  const [isBookDeleted, setIsBookDeleted] = useState(false);
  const [isBookUpdated, setIsBookUpdated] = useState(false);
  const [isBookAdded, setIsBookAdded] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchAuthors(); // Appel pour récupérer les auteurs
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Erreur lors de la récupération des livres');
        setError('Erreur lors de la récupération des livres');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion au serveur');
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/authors');
      if (response.ok) {
        const data = await response.json();
        setAuthors(data);
      } else {
        console.error('Erreur lors de la récupération des auteurs');
        setError('Erreur lors de la récupération des auteurs');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion au serveur');
    }
  };

  const handleAddOrUpdateBook = async (book) => {
    const url = book.id
      ? `http://localhost:3000/api/books/update/${book.id}`
      : 'http://localhost:3000/api/books/add';
    const method = book.id ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        await fetchBooks();
        setIsBookFormOpen(false);
        setEditingBook(null);
        setIsBookAdded(true);
        setTimeout(() => setIsBookAdded(false), 3000);
      } else {
        setError(book.id ? "Échec de la mise à jour du livre" : "Échec de l'ajout du livre");
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion au serveur');
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/books/delete/${bookId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          await fetchBooks();
          setIsBookDeleted(true);
          setTimeout(() => setIsBookDeleted(false), 3000);
        } else {
          setError('Échec de la suppression du livre');
        }
      } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur de connexion au serveur');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-indigo-800 flex items-center">
          <Book className="mr-4 text-indigo-600" size={40} />
          Bibliothèque Virtuelle
        </h2>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => {
              setIsBookFormOpen(true);
              setEditingBook(null);
            }}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-green-700 transition duration-300 ease-in-out flex items-center shadow-lg transform hover:-translate-y-1"
          >
            <Plus size={24} className="mr-2" />
            Ajouter un livre
          </button>
          <button
            onClick={() => setIsAuthorFormOpen(true)}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out flex items-center shadow-lg transform hover:-translate-y-1"
          >
            <UserPlus className="mr-2" size={24} />
            Ajouter un auteur
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r" role="alert">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        )}
        {(isBookAdded || isBookUpdated || isBookDeleted) && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r" role="alert">
            <p className="font-bold">Succès</p>
            <p>
              {isBookAdded && "Livre ajouté avec succès!"}
              {isBookUpdated && "Livre mis à jour avec succès!"}
              {isBookDeleted && "Livre supprimé avec succès!"}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                <h3 className="text-2xl font-bold text-white truncate">{book.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-2"><span className="font-semibold">Auteur:</span> {book.Author?.name || 'Inconnu'}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
                <p className="text-gray-600 mb-4"><span className="font-semibold">Année:</span> {book.publishedYear}</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setEditingBook(book);
                      setIsBookFormOpen(true);
                    }}
                    className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out"
                    aria-label="Modifier"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isBookFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <AddBookForm
                onClose={() => setIsBookFormOpen(false)}
                book={editingBook}
                onSubmit={handleAddOrUpdateBook}
              />
            </div>
          </div>
        )}

        {isAuthorFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <AddAuthor onClose={() => setIsAuthorFormOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}