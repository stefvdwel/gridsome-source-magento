// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: 'gridsome-source-magento',
      options: {
        url: 'http://demo-magento2.vuestorefront.io/rest',
        consumerKey: 'byv3730rhoulpopcq64don8ukb8lf2gq',
        consumerSecret: 'u9q4fcobv7vfx9td80oupa6uhexc27rb',
        accessToken: '040xx3qy7s0j28o3q0exrfop579cy20m',
        accessTokenSecret: '7qunl3p505rubmr7u1ijt7odyialnih9'
      }
    }
  ]
}
