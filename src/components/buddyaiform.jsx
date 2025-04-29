import React, { Component } from 'react';
import Dropdown from './dropdown';

class BuddyAIForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prompt: '',
            type: 'Project',
            difficulty: 'Beginner',
            budget: 'Medium',
            output: null
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // Mock AI Output
        const { prompt, type, difficulty, budget } = this.state;
        const result = {
            message: `AI Suggestion for "${prompt}" [${type}, ${difficulty}, ${budget}]`,
            components: ['Arduino Uno', 'DHT11 Sensor', 'OLED Display']
        };

        this.setState({ output: result });
    };

    render() {
        const { prompt, type, difficulty, budget, output } = this.state;

        return (
            <div className="container my-4 p-5 border bg-dark text-light shadow rounded-4 w-50 d-flex flex-column align-items-center">
                <div className='d-flex flex-column align-items-center'>
                    <div className='mb-3 m-auto' >
                        <i className="bi bi-robot fs-1 bg-warning px-3 py-2 rounded-4 text-dark shadow"></i>
                    </div>

                    <h4>Hi👋! Buddy Here.</h4>
                    <p>Your AI assist. What do you wanna make?</p>
                </div>
                <form >
                    <div class="mb-3">
                        <textarea className="form-control border shadow-lg" name="" id="" rows="3" placeholder='I want to build...'></textarea>
                    </div>
                    {/* Options */}
                    <div className='d-flex gap-2'>
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
                        <button className='mb-3 btn btn-secondary'>Generate <i class="bi bi-magic"></i></button>
                    </div>
                </form>
            </div>
        );
    }

    dropdown() {
        return <div>
            <select id="selectOption" class="form-select">
                <option value="">Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </select>
        </div>
    }
}

export default BuddyAIForm;


