import React, { Component } from 'react';
import Dropdown from './dropdown';
import BuddyaiController from '../conrollers/buddyai_ctrl';
import ProductTile from './product_tile';

class BuddyAIForm extends Component {
    constructor(props) {
        super(props);

        // Try to load products from localStorage
        let savedProducts = null;
        let savedPrompt = null;
        try {
            const productsSavedData = localStorage.getItem('buddyAIProducts');
            savedPrompt = localStorage.getItem('prompt');
            if (productsSavedData) {
                savedProducts = JSON.parse(productsSavedData);
            }

        } catch (error) {
            console.error('Error loading saved products:', error);
        }

        this.state = {
            prompt: savedPrompt,
            type: 'Project',
            difficulty: 'Beginner',
            budget: 'Medium',
            output: null,
            products: savedProducts, // Initialize with saved products if available
        };
        this.controller = new BuddyaiController(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const final_promt = {
            prompt: this.state.prompt,
            budget: this.state.budget,
            type: this.state.type,
            difficulty: this.state.difficulty,
        }

        const output = await this.controller.askBuddyAi(final_promt);

        // Use output directly (not from state)
        const products = this.controller.refactor(output);

        // Wait for availability check
        const availability = await this.controller.checkAvailability(products);

        // Update state once at the end
        this.setState({
            output: output,
            products: availability
        }, () => {
            // Save to localStorage after state update
            try {
                localStorage.setItem('buddyAIProducts', JSON.stringify(this.state.products));
                localStorage.setItem('prompt', JSON.stringify(this.state.prompt));
            } catch (error) {
                console.error('Error saving products to localStorage:', error);
            }
        });
    };

    render() {
        const { prompt, type, difficulty, budget, output } = this.state;
        return (
            <div className='row'>
                <div className="col align-self-start container m-4  p-5 border bg-dark text-light shadow rounded-4 d-flex flex-column align-items-center">
                    <div className='d-flex flex-column align-items-center'>
                        <div className='mb-3 m-auto' >
                            <i className="bi bi-robot fs-1 px-3 py-2 rounded-4 bg-warning text-dark shadow"></i>
                        </div>

                        <h4>Hi👋! Buddy Here.</h4>
                        <p>Your AI assist. What do you wanna make?</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>


                        <div className="mb-3">
                            <textarea name="prompt" className="form-control border shadow-lg bg-light" rows="3" placeholder='I want to build...' onChange={this.handleChange}></textarea>
                        </div>
                        <div className='d-flex justify-content-center'>
                            {/* Options */}
                            <div className='d-flex gap-1'>
                                <Dropdown
                                    name="type"
                                    options={["Budget", "100 - 500tk", "500 - 1000tk", "1000tk+"]}
                                    defaultValue=""
                                />
                                <Dropdown
                                    name="type"
                                    options={["Difficulty", "Easy", "Medium", "Hard"]}
                                    defaultValue=""

                                />
                                <Dropdown
                                    name="type"
                                    options={["Type", "Electronics", "Mechanical", "Crafting", "DIY Tool"]}
                                    defaultValue="Project"
                                />
                            </div>
                            {/* Generate Button */}
                            <button className='ms-2 mb-3 btn btn-primary shadow' type='submit'>Generate  <i className="bi bi-stars"></i></button>
                        </div>
                    </form>
                </div>
                {this.outputArea()}

            </div>
        );
    }

    clearBtnEvent() {
        localStorage.removeItem("prompt")
        localStorage.removeItem("buddyAIProducts")
        window.location.href = window.location.href
    }

    outputArea() {
        if (this.state.products) {
            console.log(this.state.products)
            return <div className='my-4 col-md-6 border shadow-sm bg-light rounded-2  h-100 m-auto p-3'>
                <button className='btn btn-outline-danger btn-sm float-right' onClick={this.clearBtnEvent}>Clear Result</button>
                <hr />
                <p>Products for prompt: <span className='text-primary'>{this.state.prompt}</span></p>
                <h5>Available</h5>
                {this.state.products == null ? "loading" :
                    this.state.products.available.map((cmp) => {
                        return <ProductTile key={cmp.id} id={cmp.id} title={cmp.name} imageUrl={cmp.image} price={cmp.price} />;
                    }
                    )}
                <h5>Unavailable</h5>
                {this.state.products == null ? "loading" :
                    this.state.products.unavailable.map((cmp, index) => {
                        return <ProductTile key={`unavailable-${index}`} title={cmp} imageUrl={"https://placehold.co/300x300"} price={"??"} />;
                    }
                    )}

            </div>
        }
        else
            return <div className=" col-md-6 border border-top-0 border-bottom-0 border-end-0 d-flex flex-column align-items-center justify-content-center p-5 text-center">
                <i className="bi bi-info-circle-fill display-3 text-muted"></i>
                <h3 className="text-gray-500 font-medium text-lg">Complete the form and click Generate</h3>
                <p className="text-gray-400 mt-2">
                    Your recommended components will appear here
                </p>
            </div >
    }
}

export default BuddyAIForm;