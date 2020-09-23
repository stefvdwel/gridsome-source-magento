const Magento2RestClient = require('magento2-rest-client').Magento2Client;

class MagentoSource {
    #magentoClient;

    static defaultOptions() {
        return {
            url: 'http://localhost/index.php/rest',
            consumerKey: 'OAuth 1.0a consumer key',
            consumerSecret: 'OAuth 1.0a access token',
            accessToken: 'OAuth 1.0a access token',
            accessTokenSecret: 'OAuth 1.0a access token secret'
        }
    }

    constructor(api, options) {
        this.#magentoClient = new Magento2RestClient(options);

        api.loadSource(async actions => {
            await this.loadCategories(actions);
            await this.loadProducts(actions);
        })
    }

    async loadCategories(actions) {
        const categories = await this.#magentoClient.categories.list();
        const collection = actions.addCollection({typeName: "Categories"});
        for (const category of categories.children_data) {
            collection.addNode(category);
        }
    }

    async loadProducts(actions) {
        const products = await this.#magentoClient.products.list();
        const collection = actions.addCollection({typeName: "Products"});
        for (const product of products.items) {
            product.custom_attributes = product.custom_attributes.map(customAttribute => {
                customAttribute.value = customAttribute.value.toString();
                return customAttribute;
            });
            collection.addNode(product);
        }
    }
}

module.exports = MagentoSource