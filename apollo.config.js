module.exports = {
  client: {
    includes: ['./src/**/*.{ts,tsx,js,jsx}'],
    tagName: 'gql',
    service: {
      name: "food-delivery-backend",
      url: "http://localhost:4000/graphql"
    },
  }
};