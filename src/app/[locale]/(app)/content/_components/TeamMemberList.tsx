import {
  contentfulTeamPageIds,
  getContent,
  TeamContentfulPageKey,
} from "@/lib/contentful";
import { Document } from "@contentful/rich-text-types";
import { setRequestLocale } from "next-intl/server";
import { Container } from "react-bootstrap";
import TeamMember, { TeamMemberProps } from "./TeamMember";

export async function getTeamMemberProps(locale: string) {
  const allTeamMemberProps = [];
  for (const slug of Object.keys(contentfulTeamPageIds)) {
    const data = await getContent(locale, slug as TeamContentfulPageKey);

    allTeamMemberProps.push({
      name: data.fields.name as string,
      title: data.fields.jobTitle as string,
      bio: data.fields.bio as Document,
      imgId: !!data.fields.cloudinaryId
        ? (data.fields.cloudinaryId as string)
        : undefined,
    });
  }
  return allTeamMemberProps;
}

export default async function TeamMemberList({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const allTeamMemberProps = await getTeamMemberProps(locale);

  return (
    <Container>
      {allTeamMemberProps.map((props: TeamMemberProps) => (
        <TeamMember {...props} />
      ))}
    </Container>
  );
}
