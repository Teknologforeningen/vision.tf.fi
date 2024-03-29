const { default: axios } = require("axios")
const path = require("path")

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const queryResults = await graphql(
    `
      query MyQuery {
        allContentfulPage {
          nodes {
            id
            slug
            section {
              ... on ContentfulImage {
                id
                slug
                image {
                  fixed(width: 1280, quality: 100) {
                    src
                    height
                    width
                  }
                }
                caption
              }
              ... on ContentfulSection {
                id
                title
                childContentfulSectionBodyTextNode {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulQuote {
                id
                title
                author
                authorImage {
                  id
                  fixed(width: 528, quality: 100) {
                    src
                  }
                }
                color
              }
              ... on ContentfulVideo {
                id
                video {
                  file {
                    url
                  }
                }
              }
              ... on ContentfulGrid {
                id
                title
                gridItems {
                  id
                  title
                  backgroundImage {
                    file {
                      url
                    }
                  }
                  page {
                    slug
                  }
                }
              }
              ... on ContentfulCover {
                id
                slogan {
                  boldedText
                  leadingText
                  trailingText {
                    trailingText
                  }
                }
              }
              ... on ContentfulSlogan {
                id
                leadingText
                boldedText
                trailingText {
                  trailingText
                }
                color
                noMargin
              }
              ... on ContentfulMultiQuote {
                id
                name
                quotes {
                  title
                  author
                  authorImage {
                    id
                    fixed(width: 528, quality: 100) {
                      src
                    }
                  }
                }
              }
              ... on ContentfulDonationForm {
                bekraftelseTackUtforlig
                bekraftelseTack
                bekraftelseAdress
                bekraftelseGruppdonation
                bekraftelseDonationsuppgifter
                childContentfulDonationFormAlternativaDonationerTextNode {
                  childMarkdownRemark {
                    html
                  }
                }
                childrenContentfulDonationFormLitenTextISlutetTextNode {
                  childrenMarkdownRemark {
                    html
                  }
                }
                donationsniva0
                donationsniva1
                donationsniva2
                donationsniva3
                donationsniva4
                faltEpost
                faltNamn
                faltSumma
                faltSynlighet
                sektionDonationsuppgifter
                sektionValjBetalningsmetod
                synlighetAnonym
                synlighetForklaring
                synlighetPseudonym
                synlighetSynlig
              }
              ... on ContentfulDonorList {
                sys {
                  contentType {
                    sys {
                      id
                    }
                  }
                }
                listTitle
              }
            }
          }
        }
      }
    `
  )

  if (queryResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)
  }

  const pageTemplate = path.resolve(`src/templates/page.tsx`)
  queryResults.data.allContentfulPage.nodes.map(page => {
    const slashIfIndexElsePageName =
      page.slug === "index"
        ? "/"
        : page.slug
            .toLowerCase()
            .replace(/(ä|å)/g, "a")
            .replace(/ö/g, "o")
            .replace(/\s/g, "-")
            .replace(/([^a-z|-])/g, "")

    createPage({
      path: slashIfIndexElsePageName,
      component: pageTemplate,
      context: {
        page,
        title: page.slug
      },
    })
  })
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};