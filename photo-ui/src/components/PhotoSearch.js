import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './PhotoSearch.css';
import { FiEdit, FiTrash2, FiSearch, FiSave, FiX, FiTag, FiFolder } from 'react-icons/fi';

const PhotoSearch = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [selectedDirectory, setSelectedDirectory] = useState('');
  const [directories, setDirectories] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const fetchDirectories = async () => {
    try {
      const response = await api.get('directories/');
      setDirectories(response.data);
    } catch (error) {
      console.error('Failed to fetch directories:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      let endpoint = `photos/?search=${query}`;
      if (selectedDirectory) {
        endpoint += `&directory=${selectedDirectory}`;
      }
      const response = await api.get(endpoint);
      setPhotos(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectories();
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedDirectory]);

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setEditForm({
      title: photo.title,
      description: photo.description,
      tags: photo.tags,
    });
  };

  const saveEdit = async () => {
    if (!editingPhoto) return;
    try {
      await api.patch(`photos/${editingPhoto.id}/`, editForm);
      setEditingPhoto(null);
      handleSearch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await api.delete(`photos/${id}/`);
        handleSearch();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const renderTagsAsBadges = (tagsString) => {
    if (!tagsString) return null;
    
    const tagArray = tagsString.split(',').map(tag => tag.trim());
    
    return (
      <div className="tags-container">
        {tagArray.map((tag, index) => (
          <span key={index} className="tag-badge">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="photo-search-container">
      <div className="search-header">
        <h2><span className="emoji">📸</span> Photo Library</h2>
        
        <div className="search-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, tags, or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <select 
              className="directory-filter"
              value={selectedDirectory}
              onChange={(e) => setSelectedDirectory(e.target.value)}
            >
              <option value="">All Directories</option>
              {directories.map(dir => (
                <option key={dir.id} value={dir.id}>{dir.name}</option>
              ))}
            </select>
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {editingPhoto && (
        <div className="edit-form-overlay">
          <div className="edit-form">
            <div className="edit-form-header">
              <h3>Edit Photo Details</h3>
              <button className="close-btn" onClick={() => setEditingPhoto(null)}>
                <FiX />
              </button>
            </div>
            
            <div className="form-preview">
              <img src={editingPhoto.image} alt={editingPhoto.title} />
            </div>
            
            <div className="form-fields">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Tags"
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                />
              </div>
              
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setEditingPhoto(null)}>Cancel</button>
                <button className="save-btn" onClick={saveEdit}>
                  <FiSave /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading photos...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">📷</div>
          <h3>No Photos Found</h3>
          <p>Try adjusting your search or uploading some new photos.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'photo-grid' : 'photo-list'}>
          {photos.map(photo => (
            <div key={photo.id} className={viewMode === 'grid' ? 'photo-card' : 'photo-list-item'}>
              <div className="photo-content">
                <div className="photo-image">
                  <img src={photo.image} alt={photo.title} />
                </div>
                
                <div className="photo-details">
                  <h4>{photo.title}</h4>
                  {photo.description && <p className="photo-description">{photo.description}</p>}
                  
                  <div className="photo-metadata">
                    {photo.tags && (
                      <div className="metadata-item">
                        <FiTag className="metadata-icon" />
                        {renderTagsAsBadges(photo.tags)}
                      </div>
                    )}
                    
                    {photo.directory_name && (
                      <div className="metadata-item">
                        <FiFolder className="metadata-icon" />
                        <span>{photo.directory_name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="photo-actions">
                <button className="action-btn edit-btn" onClick={() => handleEdit(photo)}>
                  <FiEdit /> Edit
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(photo.id)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoSearch;