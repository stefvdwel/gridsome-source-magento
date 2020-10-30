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
        this.#magentoClient.addMethods('categories', function (restClient) {
                let module = {};
                module.getCategory = function (categoryId) {
                    return restClient.get(`/categories/${categoryId}`);
                }
                return module;
            }
        )

        api.loadSource(async actions => {
            await this.loadCategories(actions);
            await this.loadProducts(actions);
        })
    }

    async loadCategories(actions) {
        const categories = await this.#magentoClient.categories.list();
        const collection = actions.addCollection({typeName: "Categories"});
        for (const category of categories.children_data) {
            const category1 = await this.#magentoClient.categories.getCategory(category.id);
            const node = {
                ...category1,
                path: "/category/" + category1.custom_attributes
                    .find(customAttribute => customAttribute.attribute_code === "url_key").value
            }
            collection.addNode(node);
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