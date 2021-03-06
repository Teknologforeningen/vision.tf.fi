import React from "react"
import Layout from "../components/layout"
import Section, { SectionNode } from "../components/section"
import SEO from "../components/seo"

interface Page {
  section: SectionNode[]
}

const Page: React.FC<{
  pageContext: {
    page: Page
    title: string
  }
}> = ({ pageContext }) => {
  const sections = pageContext.page.section.map(section => (
    <Section
      key={section.id}
      id={section.id}
      title={section.title}
      node={section}
    />
  ))

  return (
    <Layout title={pageContext.title}>
      <SEO title={pageContext.title} />
      {sections}
    </Layout>
  )
}

export default Page
