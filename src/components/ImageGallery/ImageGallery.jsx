import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem'
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import getImages from 'API/GetImgs';
import css from './ImageGallery.module.css'; 

export default function ImageGallery({ imageName = "" }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadImages = async (searchTerm) => {
            setLoading(true);
            try {
                const newImages = await getImages(searchTerm, page);
                setImages((prevState) => [...prevState, ...newImages]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (imageName) {
            setImages([]);
            setPage(1);
            loadImages(imageName);
        }
    }, [imageName, page]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                setSelectedImage(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleImageClick = (id) => {
        const selectedImage = images.find((image) => image.id === id);
        setSelectedImage(selectedImage);
    };
        
    const handleModalClose = () => {
        setSelectedImage(null);
    };

    const loadMoreImages = async (e) => {
        e.preventDefault();
        const newPage = page + 1;
        const newImages = await getImages(imageName, newPage);
        setPage(newPage);
        setImages((prevState) => [...prevState, ...newImages]);
    };

    return (
            <div>
                <ul className={css.gallery}>
                    {loading && <Loader />}
                    {images.map((item) => (
                        <ImageGalleryItem key={item.id} onClick={handleImageClick} item={item} />
                    ))}
                </ul>
                {images.length > 0 && ( 
                    <div className={css.load_more_container}>
                        <Button onClick={loadMoreImages}>Load more</Button>
                    </div>
                )}
                {selectedImage && (
                    <Modal onClose={handleModalClose}>
                        <img src={selectedImage.largeImageURL} alt={selectedImage.tags} className={css.ModalImg} />
                    </Modal>
                )}
            </div>
        );
}

ImageGallery.propTypes = {
    imageName: PropTypes.string.isRequired,
};
