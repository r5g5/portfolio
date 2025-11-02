import { graphql, useStaticQuery } from "gatsby";

import { type SiteMetadata } from "@/types/site-metadata";

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadata>(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          author {
            title
            photo
            description
          }
          menu {
            title
            url
          }
          url
          title
          copyright
          description
        }
      }
    }
  `);

  return site?.siteMetadata || {};
};

export { useSiteMetadata };
