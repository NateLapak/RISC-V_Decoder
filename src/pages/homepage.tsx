import './homepage.css'
import "./footer.css"
import "./header.css"
import Header from "../Components/header"
import Home from "../Components/home"
import Footer from '../Components/footer'

const Homepage = () => {
    return (
        <div>
            <Header/>
            <hr></hr>
            <Home />
            <Footer />
        </div>
    )
}

export default Homepage