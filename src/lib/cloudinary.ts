// Cloudinary drag-and-drop video upload settings.
// Fill these in from your free Cloudinary account (see FIREBASE_SETUP / setup guide).
export const CLOUDINARY_CLOUD_NAME: string = 'wi27tllb'
export const CLOUDINARY_UPLOAD_PRESET: string = 'dmgdusdi'

export const cloudinaryReady =
  CLOUDINARY_CLOUD_NAME !== 'PASTE_ME' && CLOUDINARY_UPLOAD_PRESET !== 'PASTE_ME'

// Uploads a video file straight from the browser to Cloudinary and returns its URL.
export function uploadVideoToCloudinary(
  file: File,
  onProgress?: (pct: number) => void
): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText).secure_url as string)
        } catch {
          reject(new Error('Unexpected response from Cloudinary.'))
        }
      } else {
        reject(new Error(`Upload failed (${xhr.status}). Check the upload preset is "unsigned".`))
      }
    }
    xhr.onerror = () => reject(new Error('Network error during upload.'))
    xhr.send(form)
  })
}
