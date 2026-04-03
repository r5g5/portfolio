import React, { type FC } from "react";
import { graphql } from "gatsby";

import { type Node } from "@/types/node";
import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

interface PageTemplateProps {
  data: {
    markdownRemark: Node;
  };
}

const PageTemplate: FC<PageTemplateProps> = ({ data }) => {
  const { html: body } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title } = frontmatter;

  return (
    <Layout>
      <Sidebar />
      <Page title={title}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`;

export const Head: FC<PageTemplateProps> = ({ data }) => {
  const { title, description } = useSiteMetadata();

  const {
    frontmatter: {
      title: pageTitle,
      description: pageDescription = description || "",
    },
  } = data.markdownRemark;

  return (
    <Meta
      title={`${pageTitle} - ${title}`}
      description={pageDescription}
    />
  );
};

export default PageTemplate;