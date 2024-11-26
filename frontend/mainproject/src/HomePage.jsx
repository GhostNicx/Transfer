import homeImage from './assets/home.jpg';

function HomePage(){
    return(
        <div className ="homepage">
            <img className="homeImage" src={homeImage} alt="Home" />
        </div>
    );
}

export default HomePage;