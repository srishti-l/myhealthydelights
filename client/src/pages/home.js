import Header from "../components/Header";
import Gallery from "../components/Gallery";
function Home() {

    return (
        <>
            <Header />
            <div>
                <section className="home-body">
                    <h2>Welcome to Healthy Delights!</h2>
                    <p className='tag-line'>Your one-stop shop for delicious and nutrient-rich bakes tailored to your dietary and health needs</p>
                    <div className="about-us">
                        <img src="/mhdlogo.jpeg" alt="Healthy Delights Logo, Smiling face with Chef hat" />
                        <div className="about-us-text">
                            <h3>About Us</h3>
                            <p>Founded in 2015, our bakery is aimed at providing delicious and healthy products for any and all consumers.
                                We cater to any health and dietary needs – keto, vegan, dairy free, gluten free, and beyond! We offer a variety of goods, ranging from nutrient dense bars to lavish tiered cakes.
                                Whether it's for a daily treat or a special occassion, we aim to provide our customers with the freshest and highest quality products.
                            </p>
                            <div className="customers">
                                <h3>See what our customers have to say: </h3>
                                <div className="customer-reviews">
                                    <p>"It was all gone within half hour"</p>
                                    <p>"Thank you for making the day special"</p>
                                    <p>"They were scrumptious and devoured within a few seconds"</p>
                                    <p>"Best we have ever had"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <h3>Check out our Cakes!</h3>
            <Gallery />
        </>
    );
}

export default Home;