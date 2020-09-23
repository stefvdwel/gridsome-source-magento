# Gridsome source Magento
This is a Gridsome source for Magento 2 webshops.

It is currently in development. Pull requests are welcome.

## Usage
### Installing
Add the plugin in gridsome.config.js and fill in your Magento credentials:
```javascript
plugins: [
    {
      use: 'gridsome-source-magento',
      options: {
        url: 'http://localhost/index.php/rest',
        consumerKey: 'a87zatskbdbprynl9vikraifyif70az5',
        consumerSecret: 'f7nbu7ylw9pwe4yd0e44yfiem8dzxzyk',
        accessToken: '1uycfly99mv43laynpepjb0rs3rynk5n',
        accessTokenSecret: 'oxrnc3g7744wwhtdpl4e8ticwtnsm224'
      }
    }
  ]
```

### Creating product pages
In gridsome.server.js:
```javascript
api.createPages(async ({graphql, createPage}) => {
        const {data} = await graphql(`query allProducts{
            allProducts{
                edges {
                  node {
                    name
                    custom_attributes {
                      attribute_code
                      value
                    }
                  }
                }
              }
            }`);
        data.allProducts.edges.forEach(node => {
            const slug = node.node.custom_attributes.find(attribute => attribute.attribute_code === 'url_key');
            createPage({
                path: `/product/${slug.value}`,
                component: './src/templates/Product.vue'
            });
        })
    })
```

