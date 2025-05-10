import React from "react";
import ComponentCard from "../components/componentcard"; // adjust path if needed
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SearchBar from "../components/searchbar";
import AdminController from "../conrollers/admin_ctrl"

class ComponentShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            selectedTag: "All",
            currentPage: 1,
            itemsPerPage: 6,
            components: []
        };

        this.controller = new AdminController(this);
    }
    async componentDidMount() {
        const response = await this.controller.getComponents();
        console.log(this.state)
    }

    handleSearch = (e) => {
        this.setState({ searchQuery: e.target.value, currentPage: 1 });
    };



    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    filterComponents = () => {
        const { components, searchQuery, selectedTag } = this.state;
        return components.filter((c) => {
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag === "All" || c.tag === selectedTag;
            return matchesSearch && matchesTag;
        });
    };

    render() {
        const { searchQuery, selectedTag, currentPage, itemsPerPage } = this.state;
        const filtered = this.filterComponents();
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        const tags = ["All", "Hardware", "Tools", "Electronics", "Crafting"];

        return (
            <div>
                <Navbar />

                <div className="container my-5">

                    <h2 className="mb-4">Component Shop</h2>

                    {/* Search */}
                    <SearchBar />
                    <hr className="mt-5" />

                    {/* Component Grid */}
                    <div className="row">
                        {paginated.length ? (
                            paginated.map(c => (
                                <div key={c.id} className="col-md-4 mb-4">
                                    <ComponentCard
                                        id={c.id}
                                        name={c.name}
                                        price={c.price}
                                        image={c.image}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No components found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages).keys()].map(i => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => this.handlePageChange(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ComponentShop;
