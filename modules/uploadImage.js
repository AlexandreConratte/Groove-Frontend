const uploadImage = async (imageUri) => {

    const BACKEND_URL = "https://backend-groove.vercel.app"

    const data = new FormData();
    data.append('photoFromFront', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
    });

    try {
        const response = await fetch(`${BACKEND_URL}/users/photo`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const responsePhoto = await response.json()
        const photoUrl = responsePhoto.url
        return photoUrl
    } catch (error) {
        console.error('Upload error:', error);
    }

};

module.exports = { uploadImage } 