import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
const tinaClientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const tinaBranch = process.env.NEXT_PUBLIC_TINA_BRANCH || "main";
const tinaToken = process.env.TINA_TOKEN || "";
const tinaGraphqlUrl =
	process.env.TINA_GRAPHQL_URL ||
	(tinaClientId
		? `https://content.tinajs.io/content/${tinaClientId}/github/${tinaBranch}`
		: "http://localhost:4001/graphql");

export const client = createClient({
	url: tinaGraphqlUrl,
	token: tinaToken,
	queries,
});
export default client;
