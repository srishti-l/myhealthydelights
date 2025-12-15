const importAll = (r) => r.keys().map(r);

const images = importAll(require.context('../assets/gallery', false, /\.(png|jpe?g|svg)$/));

function Gallery() {
    return (
        <div className="gallery-container">
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`A sample cake from the bakery`}
                    className="gallery-image"
                />
            ))}
        </div>
    );
}

export default Gallery;