import { defineConfig, defineSchema } from "tinacms";

const headingBlock = {
  name: "Heading",
  label: "Heading",
  ui: {
    defaultItem: {
      text: "Lorem ipsum dolo",
    },
  },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
  ],
};

const contentBlock = {
  name: "content",
  label: "Content",
  ui: {
    defaultItem: {
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      ui: {
        component: "textarea",
      },
      label: "Text",
      name: "text",
    },
  ],
};

const imageBlock = {
  name: "image",
  label: "Image",
  fields: [
    {
      type: "image",
      label: "Image",
      name: "imgSrc",
    },
  ],
};

const schema = defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        // {
        //   type: "string",
        //   label: "Facebook Link",
        //   name: "facebook",
        // },
        {
          type: "object",
          list: true,
          name: "intro",
          label: "About Us / Intro",
          templates: [imageBlock, contentBlock, headingBlock],
        },
        {
          label: "Bands",
          name: "bands",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.name };
            },
            defaultItem: {
              name: "rock band",
              instagram: "https://instagram.com/",
              soundcloud: "https://soundcloud.com/",
              facebook: "https://facebook.com/",
              origin: "Santiago Chile",
              year: "2020",
              style: "Trance",
              imgSrc: "/uploads/tina.jpeg",
            },
          },

          fields: [
            {
              label: "Name",
              name: "name",
              type: "string",
            },
            {
              label: "Instagram",
              name: "instagram",
              type: "string",
            },
            {
              label: "Soundcloud",
              name: "soundcloud",
              type: "string",
            },
            {
              label: "Facebook",
              name: "facebook",
              type: "string",
            },
            {
              label: "Origin",
              name: "origin",
              type: "string",
            },
            {
              label: "Year",
              name: "year",
              type: "string",
            },
            {
              label: "Style",
              name: "style",
              type: "string",
            },
            {
              type: "image",
              label: "Hero image",
              name: "imgSrc",
            },
          ],
        },

        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined;
        },
      },
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;
