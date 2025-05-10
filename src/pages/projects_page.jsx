import React from "react";
import ProjectCard from "../components/projectcard"; // adjust path if needed
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import SearchBar from "../components/searchbar";
import AdminController from "../conrollers/admin_ctrl";



class ExploreProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            selectedTag: "All",
            currentPage: 1,
            itemsPerPage: 6,
            projects: []
        };
        this.controller = new AdminController(this);
    }
    async componentDidMount() {
        const response = await this.controller.getProjects();
        console.log(this.state)
    }

    handleSearch = (e) => {
        this.setState({ searchQuery: e.target.value, currentPage: 1 });
    };

    handleFilter = (tag) => {
        this.setState({ selectedTag: tag, currentPage: 1 });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    filterprojects = () => {
        const { projects, searchQuery, selectedTag } = this.state;
        return projects.filter((c) => {
            const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag === "All" || c.tag === selectedTag;
            return matchesSearch && matchesTag;
        });
    };

    render() {
        const { searchQuery, selectedTag, currentPage, itemsPerPage } = this.state;
        const filtered = this.filterprojects();
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

                    {/* Projects Grid */}
                    <div className="row">
                        {paginated.length ? (
                            paginated.map(c => (
                                <div key={c.id} className="col-md-4 mb-4">

                                    <ProjectCard
                                        id={c.id}
                                        title={c.title}
                                        tags={c.tags}
                                        description={c.description.substring(0, 100) + " ..."}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No projects found.</p>
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

export default ExploreProjects;
