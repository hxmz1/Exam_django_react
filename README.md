
# Examen Django — Fullstack Django + React App

**une application web fullstack conçue avec **Django REST Framework** (backend) et **React.js** (frontend). Elle permet aux utilisateurs de s’inscrire, de se connecter, de créer, modifier et supprimer leurs propres posts. L’authentification est sécurisée via **JWT (JSON Web Tokens)**.

---

## 🚀 Fonctionnalités

- 🔐 Authentification JWT (login / refresh)
- 📝 Création, modification, suppression de posts
- 👤 Gestion du profil utilisateur
- 🌐 API REST sécurisée avec permissions personnalisées
- ⚛️ Frontend moderne en React.js avec Redux

---

## 📁 Structure du projet

```
fullstack_Exam/
├── back/               # Backend Django
│   ├── backend/        # Configuration principale Django
│   ├── posts/          # App principale (posts, profils)
│   ├── db.sqlite3      # Base de données SQLite
│   └── manage.py
├── front/              # Frontend React
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## 🛠️ Installation

### Prérequis
- Python 3.11+
- Node.js 16+ / npm
- Git

### 1. Cloner le projet

```bash
git clone https://github.com/hxmz1/Exam_django_react.git
cd fullstack_Exam
```

### 2. Installer le backend Django

```bash
cd back
python -m venv venv
venv\Scripts\activate       # (sur Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Installer le frontend React

```bash
cd ../front
npm install
npm start
```

---

## 🔑 Authentification

- `POST /api/token/` – Obtenir un access token + refresh token
- `POST /api/token/refresh/` – Rafraîchir le token
- Tous les endpoints `/api/posts/` nécessitent un **JWT valide** dans le header `Authorization: Bearer <token>`

---

## 🧪 API Exemple

### Créer un post
```http
POST /api/posts/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

FormData:
- title: Mon premier post
- content: Ceci est le contenu
```

---


---



## 📄 Licence

Ce projet est sous licence MIT. Libre à vous de l’utiliser et de le modifier.

---

## ✨ Auteur

👤 [Hamza ATAOUI](https://github.com/hxmz1)
