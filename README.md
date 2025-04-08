# 📸 Photo Library App

<div align="center">
  
  <br>
  <p><strong>A beautiful, fullstack photo management solution for organizing your personal collection</strong></p>
</div>

## ✨ Overview

Photo Library App is a modern, feature-rich application that provides a seamless experience for managing your photo collection. Built with Django REST Framework and React.js, it offers powerful organization features, intuitive search capabilities, and a responsive user interface.

! Click Here: [Photo Library Live](https://drive.google.com/file/d/1Y_gLDCyKnlEXn-a9yO3xcQJuWWNcpOD0/view?usp=drive_link)

## 🚀 Features

- **📁 Smart Organization** - Create directories to categorize and organize photos
- **🏷️ Advanced Tagging** - Apply multiple tags to easily find related images 
- **🔍 Powerful Search** - Find photos instantly through titles, descriptions, and tags
- **📱 Responsive UI** - Beautiful interface that works on desktop and mobile devices
- **✏️ Easy Editing** - Update photo details with an intuitive editing interface
- **🖼️ Multiple View Modes** - Toggle between grid and list views for different browsing experiences
- **⚡ Live Updates** - Real-time search results as you type

## 🛠️ Tech Stack

### Backend
- [Django](https://www.djangoproject.com/) - High-level Python web framework
- [Django REST Framework](https://www.django-rest-framework.org/) - Powerful toolkit for building RESTful APIs
- [SQLite](https://www.sqlite.org/) - Lightweight database (configurable for production)

### Frontend
- [React.js](https://reactjs.org/) - Modern JavaScript library for building user interfaces
- [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests
- [React Icons](https://react-icons.github.io/react-icons/) - Beautiful icon components
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Custom styling for a polished UI

## 📦 Project Structure

```
photo_library_app/
├── backend/
│   ├── photos/              # Django app (models, views, serializers)
│   ├── media/photos/        # Uploaded photo files
│   ├── db.sqlite3           # SQLite database
│   └── manage.py            # Django management script
│
├── ui/
│   ├── photo-ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── PhotoUpload.js
│   │   │   │   ├── PhotoUpload.css
│   │   │   │   ├── PhotoSearch.js
│   │   │   │   └── PhotoSearch.css
│   │   │   ├── services/
│   │   │   │   └── api.js  # API configuration
│   │   │   ├── App.js
│   │   │   └── index.js
│   │   ├── public/
│   │   └── package.json
```

## 💻 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [Python](https://www.python.org/) (v3.8+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Backend Setup

```bash
# Clone the repository
git clone ...
cd photo-library-app

# Navigate to backend folder
cd backend folder

# Set up virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser (follow prompts)
python manage.py createsuperuser

# Run server
python manage.py runserver
```

### Frontend Setup

```bash
# Open a new terminal and navigate to frontend folder
cd ui/photo-ui

# Install dependencies
npm install
# or with yarn
yarn install

# Start development server
npm start
# or with yarn
yarn start
```

Your backend server will be running at http://localhost:8000 and frontend at http://localhost:3000

## 🖱️ Usage

### Managing Photos
1. **Upload Photos**: Click the "Upload" button to add new photos with metadata
2. **Search**: Use the search bar to filter photos by title, tags, or descriptions
3. **Edit**: Click the pencil icon to modify photo details
4. **Delete**: Remove unwanted photos with the trash icon
5. **Organize**: Create and assign directories to keep photos organized

### Directory Management
1. **Create**: Add new directories from the upload form
2. **Filter**: Use the directory dropdown to view specific categories
3. **Remove**: Delete empty directories when no longer needed

## 🔌 API Reference

| Method |         Endpoint          | Description |
|--------|---------------------------|-------------|
| GET    |   `/api/photos/`          | List all photos with optional search parameters |
| POST   |   `/api/photos/`          | Upload a new photo with metadata |
| GET    |   `/api/photos/:id/`      | Retrieve a specific photo |
| PATCH  |   `/api/photos/:id/`      | Update photo details |
| DELETE |   `/api/photos/:id/`      | Remove a photo |
| GET    |   `/api/directories/`     | List all directories |
| POST   |   `/api/directories/`     | Create a new directory |
| DELETE |   `/api/directories/:id/` | Delete a directory |
| GET    |   `/api/photos/?search=`  | Search photos by tag, title, or description|


## 🚀 Deployment

### Production Recommendations
- **Backend**: Deploy on [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://www.heroku.com/)
- **Frontend**: Host via [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/)
- **Media Storage**: [AWS S3](https://aws.amazon.com/s3/) or [Cloudinary](https://cloudinary.com/) for production environments

## 📞 Contact

Project Link: [https://github.com/vigneshp2604/photo-lib-page](https://github.com/vigneshp2604/photo_lib_page)
