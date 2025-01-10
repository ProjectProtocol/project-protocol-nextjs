import { getContentfulType } from "@/lib/contentful";
import { Document } from "@contentful/rich-text-types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "react-bootstrap";
import TeamMember, { TeamMemberProps } from "./TeamMember";

async function getTeamMemberProps(locale: string) {
  const people: { [key: string]: TeamMemberProps[] } = {
    team_member: [],
    board_member: [],
    founder: [],
  };

  const data = await getContentfulType("teamMember", locale);
  data.items.forEach((item) => {
    const role = item.fields.role as "team_member" | "board_member" | "founder";
    people[role].push({
      name: item.fields.name as string,
      title: item.fields.jobTitle as string,
      bio: item.fields.bio as Document,
      imgId: item.fields.cloudinaryId as string,
    });
  });
  return people;
}

export default async function TeamMemberList({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const { board_member, team_member, founder } = await getTeamMemberProps(
    locale
  );

  const t = await getTranslations("navigation");

  return (
    <Container className="vertical-rhythm">
      <h3>{t("theTeam.boardMembers")}</h3>
      {board_member.map((props: TeamMemberProps) => (
        <TeamMember key={props.name} {...props} />
      ))}
      <hr />
      <h3>{t("theTeam.founder")}</h3>
      {founder.map((props: TeamMemberProps) => (
        <TeamMember key={props.name} {...props} />
      ))}
      <hr />
      {team_member.map((props: TeamMemberProps) => (
        <TeamMember {...props} key={props.name} />
      ))}
    </Container>
  );
}
