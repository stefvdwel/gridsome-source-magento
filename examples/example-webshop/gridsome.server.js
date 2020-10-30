// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
    api.loadSource(({addCollection}) => {
        // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    })

    api.createPages(async ({graphql, createPage}) => {
        const {data} = await graphql(`query allCategories{
          allCategories{
            edges {
              node {
                id
                name
                is_active
                position,
                custom_attributes {
                  attribute_code
                  value
                }
              }
            }
          }
        }`);
        data.allCategories.edges.forEach(node => {
            console.log(node.node.custom_attributes);
            console.log(node.node.custom_attributes.find(customAttribute => customAttribute.attribute_code === "url_key"));
            // node.custom_attributes.forEach(customAttribute => {
            //     console.log(customAttribute);
            // })
            const slug = node.node.custom_attributes.find(customAttribute => customAttribute.attribute_code === "url_key")
            createPage({
                path: `/category/${slug.value}`,
                component: './src/templates/Category.vue',
                context: {
                    path: `/category/${slug.value}`
                }
            });
        })
    })
}
