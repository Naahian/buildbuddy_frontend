import { Component } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import BuddyAIForm from "../components/buddyaiform";

class BuddyaiPage extends Component {
    render() {
        return <div>
            <Navbar />
            <div className="container">
                <BuddyAIForm />
            </div>
            <hr style={{ marginTop: "8rem" }} />
            <Footer />
        </div>
    }
}

export default BuddyaiPage;