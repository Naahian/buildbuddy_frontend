import { API } from "../api/api";

export class BuddyaiController {
    constructor(componentInstance) {
        this.component = componentInstance;
    }

    async askBuddyAi(prompt) {
        const output = await API.buddyAiPromt(prompt);
        this.component.setState({ output });
        return output; // Return the output for direct usage
    }


    // In the controller file
    checkAvailability(requiredProducts) {
        // Return the Promise so it can be used with .then() or await
        return API.getComponents().then(res => {
            // Find all products that match any required keyword
            const available = res.filter(p =>
                requiredProducts.some(req =>
                    req.toLowerCase().includes(p.name.toLowerCase()) ||
                    p.name.toLowerCase().includes(req.toLowerCase())
                )
            );

            // This is the fixed logic for unavailable products
            const unavailable = requiredProducts.filter(req =>
                !available.some(avail =>
                    req.toLowerCase().includes(avail.name.toLowerCase()) ||
                    avail.name.toLowerCase().includes(req.toLowerCase())
                )
            );

            return {
                available,
                unavailable
            };
        });
    }


    refactor(rawText) {
        rawText = rawText[0].content.parts[0].text

        const fixedText = rawText.replace(/'/g, '"');
        const products = JSON.parse(fixedText);
        const all_products = [...products.components, ...products.tools]

        return all_products;
    }

    showAlert(response) {
        if ((typeof response.message).includes("object")) {
            alert(JSON.stringify(response.message));
        } else {
            alert(response.message);
        }

    }
}

export default BuddyaiController;