import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import './PhotoUpload.css';
import { FiUpload, FiPlus, FiFolder, FiX, FiTrash2, FiImage } from 'react-icons/fi';

const PhotoUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    directory: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [directories, setDirectories] = useState([]);
  const [newDir, setNewDir] = useState('');
  const [isCreatingDir, setIsCreatingDir] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  
  const fetchDirectories = async () => {
    try {
      const res = await api.get('directories/');
      setDirectories(res.data);
    } catch (error) {
      console.error('Failed to fetch directories:', error);
    }
  };

  useEffect(() => {
    fetchDirectories();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImage(file);
    
    // Create preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Clear error for image if it exists
    if (errors.image) {
      setErrors({
        ...errors,
        image: null,
      });
    }
  };

  const handleAddDirectory = async () => {
    if (!newDir.trim()) {
      setErrors({
        ...errors,
        newDirectory: 'Directory name cannot be empty',
      });
      return;
    }
    
    try {
      await api.post('directories/', { name: newDir });
      setNewDir('');
      setIsCreatingDir(false);
      fetchDirectories();
    } catch (error) {
      console.error('Failed to create directory:', error);
      setErrors({
        ...errors,
        newDirectory: 'Failed to create directory',
      });
    }
  };

  const handleDeleteDirectory = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete the directory "${name}"?`);
    if (!confirmed) return;
    
    try {
      await api.delete(`directories/${id}/`);
      fetchDirectories();
    } catch (error) {
      console.error('Failed to delete directory:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!image) {
      newErrors.image = 'Please select an image to upload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('tags', formData.tags);
      submitFormData.append('image', image);
      
      if (formData.directory) {
        submitFormData.append('directory', formData.directory);
      }

      await api.post('photos/', submitFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form after successful upload
      setFormData({
        title: '',
        description: '',
        tags: '',
        directory: '',
      });
      setImage(null);
      setImagePreview(null);
      
      // Show success message
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      
    } catch (error) {
      console.error('Upload failed:', error);
      
      // Handle API error responses
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({
          form: 'Failed to upload photo. Please try again.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="photo-upload-container">
      <div className="upload-header">
        <h2><span className="emoji">📷</span> Upload Photos</h2>
        <p>Add new photos to your library</p>
      </div>
      
      {uploadSuccess && (
        <div className="success-message">
          <FiImage className="success-icon" />
          <span>Photo uploaded successfully!</span>
        </div>
      )}
      
      {errors.form && (
        <div className="error-message">
          <span>{errors.form}</span>
        </div>
      )}
      
      <form onSubmit={handlePhotoSubmit} className="photo-form">
        <div className="form-layout">
          <div className="form-section image-section">
            <div 
              className={`image-upload-area ${errors.image ? 'has-error' : ''}`}
              onClick={triggerFilePicker}
            >
              {imagePreview ? (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <FiUpload className="upload-icon" />
                  <p>Click to select an image</p>
                  <span>or drag and drop here</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*" 
                className="file-input"
              />
            </div>
            {errors.image && <div className="error-text">{errors.image}</div>}
          </div>
          
          <div className="form-section details-section">
            <div className="form-group">
              <label htmlFor="title">Title <span className="required">*</span></label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter a title for your photo"
                value={formData.title}
                onChange={handleFormChange}
                className={errors.title ? 'has-error' : ''}
              />
              {errors.title && <div className="error-text">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Add a description"
                value={formData.description}
                onChange={handleFormChange}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="Add tags (comma separated)"
                value={formData.tags}
                onChange={handleFormChange}
              />
              <div className="form-help">Separate multiple tags with commas</div>
            </div>
            
            <div className="form-group">
              <label htmlFor="directory">Directory</label>
              <div className="directory-select-container">
                <select
                  id="directory"
                  name="directory"
                  value={formData.directory}
                  onChange={handleFormChange}
                >
                  <option value="">-- No Directory --</option>
                  {directories.map(dir => (
                    <option key={dir.id} value={dir.id}>{dir.name}</option>
                  ))}
                </select>
                
                <button 
                  type="button"
                  className="new-dir-btn"
                  onClick={() => setIsCreatingDir(true)}
                >
                  <FiPlus /> New
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </div>
      </form>
      
      {isCreatingDir && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3><FiFolder /> Add New Directory</h3>
              <button className="close-modal-btn" onClick={() => setIsCreatingDir(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Directory Name</label>
                <input
                  type="text"
                  value={newDir}
                  onChange={(e) => setNewDir(e.target.value)}
                  placeholder="Enter directory name"
                  className={errors.newDirectory ? 'has-error' : ''}
                />
                {errors.newDirectory && <div className="error-text">{errors.newDirectory}</div>}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsCreatingDir(false)}>Cancel</button>
              <button className="create-btn" onClick={handleAddDirectory}>Create Directory</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="directory-manager">
        <div className="section-header">
          <h3><FiFolder /> Manage Directories</h3>
        </div>
        
        {directories.length === 0 ? (
          <div className="empty-state">
            <p>No directories created yet</p>
          </div>
        ) : (
          <ul className="directory-list">
            {directories.map((dir) => (
              <li key={dir.id} className="directory-item">
                <span className="directory-name">{dir.name}</span>
                <button
                  className="delete-dir-btn"
                  onClick={() => handleDeleteDirectory(dir.id, dir.name)}
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;