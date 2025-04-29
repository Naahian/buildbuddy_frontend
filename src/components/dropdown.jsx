import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.defaultValue || ''
        };
    }

    handleChange = (e) => {
        const selected = e.target.value;
        this.setState({ selected });
        this.props.onSelect(selected);
    };

    render() {
        const { options, label, name } = this.props;
        const { selected } = this.state;

        return (
            <div className="mb-3">
                {label && <label className="form-label">{label}</label>}
                <select
                    className="form-select bg-dark text-white"
                    name={name}
                    value={selected}
                    onChange={this.handleChange}
                >
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default Dropdown;
