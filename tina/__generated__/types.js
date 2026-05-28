export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  landingImageSrc
  landingDarkImageSrc
  introtext
  somosImgSrc
  bands {
    __typename
    name
    instagram
    soundcloud
    facebook
    origin
    year
    style
    imgSrc
  }
  activities {
    __typename
    name
    text
    imgSrc
  }
  kayak {
    __typename
    ... on PageKayakHeading {
      heading
    }
    ... on PageKayakContent {
      textz
    }
    ... on PageKayakImage {
      imgSrc
    }
  }
  feria {
    __typename
    ... on PageFeriaHeading {
      heading
    }
    ... on PageFeriaContent {
      textz
    }
    ... on PageFeriaImage {
      imgSrc
    }
  }
  llegar {
    __typename
    ... on PageLlegarHeading {
      heading
    }
    ... on PageLlegarContent {
      textz
    }
    ... on PageLlegarImage {
      imgSrc
    }
  }
  tickets {
    __typename
    ... on PageTicketsHeading {
      heading
    }
    ... on PageTicketsContent {
      textz
    }
    ... on PageTicketsImage {
      imgSrc
    }
  }
  fotos {
    __typename
    name
    imgSrc
  }
  FAQintro
  camping {
    __typename
    ... on PageCampingHeading {
      heading
    }
    ... on PageCampingContent {
      textz
    }
    ... on PageCampingImage {
      imgSrc
    }
  }
  faq {
    __typename
    question
    response
  }
}
    `;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
