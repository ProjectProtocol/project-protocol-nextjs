import { Document } from "@contentful/rich-text-types";
import { contentfulLocale, fetchGraphQL } from "../contentful";

export const TEAM_MEMBER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  jobTitle
  cloudinaryId
  role
  bio {
    json
  }
`;

export type ContentfulTeamMember = {
  sys: {
    id: string;
  };
  name: string;
  jobTitle: string;
  role: "team_member" | "board_member" | "founder";
  cloudinaryId: string;
  bio: {
    json: Document;
  };
};

const allTeamMembersQuery = (locale: string) => `
  query {
    teamMemberCollection(locale: "${locale}") {
      items {
        ${TEAM_MEMBER_GRAPHQL_FIELDS}
      }
    }
  }
`;

export async function getTeamMembers(
  locale: string
): Promise<ContentfulTeamMember[]> {
  const query = allTeamMembersQuery(contentfulLocale(locale));
  const response = await fetchGraphQL(query, ["teamMember"]);
  const data = response.data.teamMemberCollection.items;
  return data;
}
