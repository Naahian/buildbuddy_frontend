import React from 'react';

class SearchBar extends React.Component {
    render() {
        const { value, onChange, placeholder = "Search..." } = this.props;

        return (
            <div className="input-group mb-3">
                <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default SearchBar;
