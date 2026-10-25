/**
 * Cloudinary Storage & Transformation Service
 * Supports PDF, PNG, and JPG uploads with real-time progress tracking.
 */

export const getCloudinaryConfig = () => {
  const envCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const envPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const envApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

  const localCloudName = localStorage.getItem('cloudinary_cloud_name');
  const localPreset = localStorage.getItem('cloudinary_upload_preset');
  const localApiKey = localStorage.getItem('cloudinary_api_key');

  return {
    cloudName: localCloudName || envCloudName || '',
    uploadPreset: localPreset || envPreset || '',
    apiKey: localApiKey || envApiKey || '',
    isConfigured: Boolean((localCloudName || envCloudName) && (localPreset || envPreset)),
  };
};

export const saveCloudinaryConfig = ({ cloudName, uploadPreset, apiKey }) => {
  if (cloudName !== undefined) localStorage.setItem('cloudinary_cloud_name', cloudName.trim());
  if (uploadPreset !== undefined) localStorage.setItem('cloudinary_upload_preset', uploadPreset.trim());
  if (apiKey !== undefined) localStorage.setItem('cloudinary_api_key', apiKey.trim());
};

/**
 * Uploads a file (PDF / Image) to Cloudinary with real-time progress callbacks.
 * If credentials are not configured, falls back to local blob generation with simulated progress.
 */
export const uploadToCloudinary = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const config = getCloudinaryConfig();

    if (!config.isConfigured) {
      // Graceful simulated upload if no credentials yet
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (onProgress) onProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(interval);
          const localUrl = URL.createObjectURL(file);
          resolve({
            isMock: true,
            secure_url: localUrl,
            public_id: `mock_docs_${Date.now()}`,
            format: file.name.split('.').pop() || 'pdf',
            bytes: file.size,
            original_filename: file.name,
            created_at: new Date().toISOString(),
          });
        }
      }, 100);
      return;
    }

    const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/auto/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.uploadPreset);
    if (config.apiKey) {
      formData.append('api_key', config.apiKey);
    }
    formData.append('folder', 'invoice_intelligence_vault');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            ...response,
            isMock: false,
          });
        } catch (e) {
          reject(new Error('Failed to parse Cloudinary response'));
        }
      } else {
        try {
          const errorResp = JSON.parse(xhr.responseText);
          reject(new Error(errorResp?.error?.message || `Upload failed with status ${xhr.status}`));
        } catch (e) {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary upload'));
    };

    xhr.send(formData);
  });
};

/**
 * Generate an optimized preview URL from Cloudinary public ID or secure URL
 */
export const getCloudinaryOptimizedUrl = (url, { width = 800, quality = 'auto', page = 1 } = {}) => {
  if (!url) return '';
  if (!url.includes('cloudinary.com')) return url;

  // Insert transformations into Cloudinary URL
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const prefix = url.substring(0, uploadIndex + 8);
  const suffix = url.substring(uploadIndex + 8);

  const transformations = [`w_${width}`, `q_${quality}`, `f_auto`];
  if (url.toLowerCase().endsWith('.pdf')) {
    transformations.push(`pg_${page}`);
  }

  return `${prefix}${transformations.join(',')}/${suffix}`;
};
