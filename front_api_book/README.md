# Bibliothèque Virtuelle

Ce projet est une application front-end permettant de gérer une collection de livres et d'auteurs, avec un système d'authentification. L'application interagit avec une API back-end pour stocker et gérer les données des utilisateurs, des livres et des auteurs.

## Fonctionnalités

- **Affichage des livres** : Récupération et affichage de la liste des livres disponibles avec leurs détails (titre, auteur, ISBN, année de publication).
- **Ajout de livres** : Possibilité d'ajouter un nouveau livre via un formulaire.
- **Modification de livres** : Possibilité de modifier les informations d'un livre existant.
- **Suppression de livres** : Suppression d'un livre de la liste après confirmation.
- **Affichage des auteurs** : Récupération et affichage de la liste des auteurs.
- **Ajout d'auteurs** : Possibilité d'ajouter un nouvel auteur via un formulaire.
- **Authentification** : Système de login et de registre pour accéder aux fonctionnalités de l'application.

## Pages de l'application

### 1. `Home.jsx`
La page d'accueil propose des liens vers la page de connexion, la page d'enregistrement, et la gestion des livres si l'utilisateur est authentifié.

### 2. `LoginPage.jsx`
Page de connexion. L'utilisateur peut entrer ses identifiants (email et mot de passe) pour accéder à l'application. Cette page envoie une requête au back-end pour vérifier les informations de connexion et stocker un token JWT pour authentification des requêtes suivantes.

### 3. `RegisterPage.jsx`
Page d'enregistrement. Permet à un nouvel utilisateur de créer un compte en fournissant son email, son mot de passe, et d'autres informations nécessaires. Les informations sont envoyées au back-end pour créer un nouvel utilisateur.

### 4. `BookListPage.jsx`
Affiche la liste des livres avec des options pour ajouter, modifier et supprimer des livres. Il permet également d'ajouter un nouvel auteur via un formulaire dédié.

## Composants

### 1. `AddAuthor.jsx`
Composant pour ajouter un nouvel auteur. Ce formulaire permet à l'utilisateur d'entrer le nom d'un auteur et de l'enregistrer dans la base de données via une requête POST à l'API back-end.

### 2. `AddBookForm.jsx`
Composant pour ajouter ou modifier un livre. Il contient un formulaire permettant de remplir les informations du livre (titre, auteur, ISBN, année de publication). Si un livre est passé en paramètre, le formulaire est utilisé pour modifier ses informations, sinon il permet d'en créer un nouveau.

## Utilisation de l'API

L'application interagit avec une API RESTful pour gérer les livres, les auteurs et l'authentification des utilisateurs. Voici les principales requêtes :

- **GET** `/api/books` : Récupérer la liste des livres.
- **GET** `/api/authors` : Récupérer la liste des auteurs.
- **POST** `/api/books/add` : Ajouter un nouveau livre.
- **PATCH** `/api/books/update/{id}` : Mettre à jour les informations d'un livre.
- **DELETE** `/api/books/delete/{id}` : Supprimer un livre.
- **POST** `/api/auth/register` : Enregistrer un nouvel utilisateur.
- **POST** `/api/auth/login` : Connecter un utilisateur.

Chaque requête à l'API nécessite un token JWT qui est stocké dans le `localStorage` après connexion.

## Dépendances

L'application utilise les bibliothèques suivantes :

- **React** : Framework JavaScript pour construire l'interface utilisateur.
- **lucide-react** : Bibliothèque d'icônes utilisée pour améliorer l'expérience utilisateur.
- **tailwindcss** : Framework CSS pour styliser l'application.
  
## Installation et exécution

1. Cloner ce repository.
2. Installer les dépendances avec `npm install`.
3. Exécuter l'application avec `npm start`.
4. L'application front-end sera accessible à l'adresse `http://localhost:3000`.

### Configuration

L'application dépend d'un back-end pour fonctionner correctement. Assurez-vous que l'API est disponible à l'adresse `http://localhost:3000/api`.

## Améliorations possibles

- Ajout de pagination pour la liste des livres.
- Validation avancée des formulaires (vérification des champs comme l'ISBN, l'année de publication, etc.).
- Ajout d'une fonctionnalité de recherche et de filtrage des livres et des auteurs.
- Gestion des erreurs et des retours plus détaillés pour l'authentification.

## Auteur

Cette application a été développée par [Niko Dev Web].

