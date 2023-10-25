import { defineConfig, defineSchema } from "tinacms";

const headingBlock = {
  name: "Heading",
  label: "Heading",
  ui: {
    defaultItem: {
      heading: "Lorem ipsum dolo",
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
      textz:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Text",
      name: "textz",
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
        {
          type: "image",
          label: "Landing Image",
          name: "landingImageSrc",
        },
        {
          type: "string",
          label: "Intro Text",
          name: "introtext",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "image",
          label: "Somos Image",
          name: "somosImgSrc",
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
          label: "Actividades",
          name: "activities",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.name };
            },
            defaultItem: {
              name: "Actividad",
              text: "Detalle Aqui",
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
              label: "Detalle",
              name: "text",
              type: "string",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "image",
              label: "Imagen",
              name: "imgSrc",
            },
          ],
        },
        // {
        //   type: "object",
        //   list: true,
        //   name: "blockdemo",
        //   label: "BlockDemo",
        //   templates: [imageBlock, contentBlock, headingBlock],
        // },
        {
          type: "object",
          list: true,
          name: "kayak",
          label: "Kayak Section",
          templates: [imageBlock, contentBlock, headingBlock],
        },
        {
          type: "object",
          list: true,
          name: "feria",
          label: "Feria Section",
          templates: [imageBlock, contentBlock, headingBlock],
        },
        {
          type: "object",
          list: true,
          name: "llegar",
          label: "Como Llegar Section",
          templates: [imageBlock, contentBlock, headingBlock],
        },
        {
          type: "object",
          list: true,
          name: "tickets",
          label: "Tickets Info",
          templates: [imageBlock, contentBlock, headingBlock],
        },
        {
          label: "Fotos",
          name: "fotos",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.name };
            },
            defaultItem: {
              name: "Foto #",
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
              type: "image",
              label: "Imagen",
              name: "imgSrc",
            },
          ],
        },

        {
          type: "string",
          label: "FAQ text",
          name: "FAQintro",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "object",
          list: true,
          name: "camping",
          label: "Camping Section",
          templates: [imageBlock, contentBlock, headingBlock],
        },
        {
          label: "Preguntas Frequentes",
          name: "faq",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.question };
            },
            defaultItem: {
              question: "Que es ? ",
              response: "Esto signifiga",
            },
          },

          fields: [
            {
              label: "Question",
              name: "question",
              type: "string",
            },
            {
              label: "Response",
              name: "response",
              type: "string",
              ui: {
                component: "textarea",
              },
            },
          ],
        },

        // {
        //   name: "body",
        //   label: "Main Content",
        //   type: "rich-text",
        //   isBody: true,
        // },
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
  clientId: process.env.TINA_CLIENT_ID,
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
