// src/pages/LandingPage.jsx
import React, { Component } from 'react';
import ProjectCard from '../components/projectcard';
import ComponentCard from '../components/componentcard';
import Navbar from '../components/navbar';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                {/* Hero Section */}
                <section className="bg-dark text-light d-flex justify-content-center align-items-center" style={{ height: 600 }}>

                    <div className="container">
                        <h1 className="display-4 fw-bold">Welcome to BuildBuddy</h1>
                        <p className="lead mb-4">
                            Discover, build, and manage hardware projects smarter with AI-powered tools.
                        </p>
                        <a href="/signup" className="btn btn-primary bg-kPrimary btn-lg px-4 me-2">Get Started</a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container py-5">
                    <h2 className="text-center mb-5">Why BuildBuddy?</h2>
                    <div className="row text-center">
                        <div className="col-md-4 ">
                            <div className="mb-4">
                                <i className="bi bi-cpu-fill fs-1 text-primary"></i>
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
                </section>

                {/* Featured Component */}
                <section className="bg-light py-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Featured Components</h2>
                        <div className="d-flex  gap-2">
                            <ComponentCard name="Arduino Uno" price="400" image="https://placehold.co/400x300/png" />
                            <ComponentCard name="Arduino Uno" price="400" image="https://placehold.co/400x300/png" />
                            <ComponentCard name="Arduino Uno" price="400" image="https://placehold.co/400x300/png" />
                            <ComponentCard name="Arduino Uno" price="400" image="https://placehold.co/400x300/png" />
                        </div>

                        <div className='d-flex justify-content-center pt-5'>
                            <a href='#' className=' btn btn-outline-secondary'>see more</a>
                        </div>
                    </div>
                </section>

                {/* Projects Showcase */}
                <section className="py-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Explore Projects</h2>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <ProjectCard title="Project One" description="This is a short detail of project. This is a short detail of project. This is a short detail of project." image="https://placehold.co/400x300/png" />
                            </div>
                            <div className="col-md-4 mb-4">
                                <ProjectCard title="Project two" description="This is a short detail of project. This is a short detail of project. This is a short detail of project." image="https://placehold.co/400x300/png" />

                            </div>
                            <div className="col-md-4 mb-4">
                                <ProjectCard title="Project three" description="This is a short detail of project. This is a short detail of project. This is a short detail of project." image="https://placehold.co/400x300/png" />
                            </div>
                            <div className='d-flex justify-content-center pt-3'>
                                <a href='#' className=' btn btn-outline-secondary'>see more</a>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer className="bg-dark text-white py-4">
                    <div className="container text-center">
                        <p className="mb-1">&copy; 2025 BuildBuddy. All rights reserved.</p>
                    </div>
                </footer>

            </div>
        );
    }
}

export default Home;
