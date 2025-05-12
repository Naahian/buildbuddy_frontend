// src/pages/LandingPage.jsx
import React, { Component } from 'react';
import ProjectCard from '../components/projectcard';
import ComponentCard from '../components/componentcard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import heroImage from '../assets/hero.jpg';
import { Link } from 'react-router-dom';
import ai from '../assets/ai.png';
import AskBuddyButton from '../components/buddybtn';
import { API } from '../api/api';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            projects: []
        }
    }
    componentDidMount() {
        API.getComponents().then(result => this.setState({ products: result.slice(0, 4) }))
        API.getProjects().then(result => this.setState({ projects: result.slice(0, 3) }))
    }
    render() {

        return (
            <div>
                <Navbar />
                <HeroSection />
                <FeatureSection />
                <br />
                <br />
                {FeaturedProducts(this.state.products)}
                <BuddyAiSection />
                {ExploreProjects(this.state.projects)}
                <Footer />

            </div>
        );
    }
}



export default Home;


function HeroSection() {
    const contents = {
        heading: <h1 className="display-4 fw-bold px-5">Your All-in-One Platform to
            <i style={{ color: "#1E90FF" }}> Generate</i>,
            <i style={{ color: "#32cd32" }}> Explore</i>, and
            <i style={{ color: "#FF4500" }}> Shop</i> DIY Projects</h1>,
        subheeading: "You got an idea to make something but dont know what you need to get started? Buildbuddy got you covered.",
    }

    const heroBackground = {
        height: 650,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`
    };


    return <section className="text-light text-center d-flex justify-content-center align-items-center" style={heroBackground}>

        <div className="container mb-5 pb-5">
            {contents.heading}
            <p className="lead mb-4" style={{ textShadow: "0px 2px 5px #111" }}>
                {contents.subheeading}
            </p>
            <AskBuddyButton />
        </div>
    </section>;
}

function FeaturedProducts(products) {

    return <section className="pt-5 mt-5">
        <div className="container mt-5">
            <h2 className="text-center mb-4">Featured Products</h2>
            <div className="d-flex  gap-2">
                {
                    products.map(c =>
                        <ComponentCard id={c.id} name={c.name} price={c.price} image={c.image} />
                    )
                }
            </div>

            <div className='d-flex justify-content-center pt-5'>
                <Link to='/shop' className=' btn btn-outline-secondary'>see more</Link>
            </div>
        </div>
    </section>;
}

function FeatureSection() {

    const gradientText = {
        background: 'linear-gradient(to right, #FF4500, #1E90FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }

    return <section
        className="container position-absolute start-50 translate-middle-x py-5 bg-light rounded-4 shadow border"
        style={{ bottom: "-7rem" }}
    >
        <div className="row text-center">
            <div className="col-md-4 ">
                <div className="mb-4">
                    <i class="bi bi-stars fs-1" style={gradientText}></i>
                </div>
                <h5>AI Component Generator</h5>
                <p>Input your project idea and let our AI suggest the right components instantly.</p>
            </div>
            <div className="col-md-4 ">
                <div className="mb-4">
                    <i className="bi bi-shop-window fs-1 text-success"></i>
                </div>
                <h5>Integrated Component Shop</h5>
                <p>Explore and purchase hardware components directly from the platform.</p>
            </div>
            <div className="col-md-4 ">
                <div className="mb-4">
                    <i className="bi bi-people-fill fs-1 text-warning"></i>
                </div>
                <h5>Community Projects</h5>
                <p>Explore Common premade project with needed component</p>
            </div>
        </div>
    </section>;
}

// Page Components (too lazy to make files for components)


function BuddyAiSection() {
    const gradientText = {
        background: 'linear-gradient(to right, #FF4500, #1E90Ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }

    return (
        <section className="bg-light d-flex justify-content-center mt-5" style={{ height: 500 }}>
            <div className="container row align-items-center">
                {/* Left Side: Text Content */}
                <div className="col-md-6 px-5">
                    <h1 className="mb-3">Meet Buddy AI</h1>
                    <p className="text-muted">
                        Buddy AI is your smart assistant for project planning. Just describe your idea, and it will instantly generate a tailored list of components — from sensors and microcontrollers to tools and hardware.
                    </p>
                    <br />
                    <AskBuddyButton />
                </div>

                {/* Right Side: Image */}
                <div className="col-md-6 text-center mt-4 mt-md-0">
                    <img
                        src={ai}
                        alt="Buddy AI preview"
                        className="img-fluid rounded shadow"
                    />
                </div>
            </div>
        </section>
    );
};


function ExploreProjects(projects) {
    return <section className="py-5">
        <div className="container">
            <h2 className="text-center mb-4">Explore Projects</h2>
            <div className="row">
                {
                    projects.map(p => <div className="col-md-4 mb-4">
                        <ProjectCard id={p.id} title={p.title} description={p.description} tags={p.tags} />
                    </div>
                    )
                }
                <div className='d-flex justify-content-center pt-3'>
                    <Link to='/projects' className=' btn btn-outline-secondary'>see more</Link>
                </div>
            </div>
        </div>
    </section>;
}



