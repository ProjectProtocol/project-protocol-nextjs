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

    let imageSrc;
    if (!!data.fields.cloudinaryId) {
      let id = data.fields.cloudinaryId as string;
      imageSrc = id;
    } else {
      imageSrc = undefined;
    }

    const bio = data.fields.bio as Document;

    allTeamMemberProps.push({
      name: data.fields.name as string,
      title: data.fields.jobTitle as string,
      bio: bio,
      imgId: imageSrc,
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
