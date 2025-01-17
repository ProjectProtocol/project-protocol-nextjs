import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "react-bootstrap";
import TeamMember from "./TeamMember";
import {
  ContentfulTeamMember,
  getTeamMembers,
} from "@/lib/contentful/team-member";
import { groupBy } from "lodash";

async function getTeamMemberProps(locale: string) {
  const teamMembers = await getTeamMembers(locale);
  return groupBy(teamMembers, "role");
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
      {board_member.map((t: ContentfulTeamMember) => (
        <TeamMember key={t.name} teamMember={t} />
      ))}
      <hr />
      <h3>{t("theTeam.founder")}</h3>
      {founder.map((t: ContentfulTeamMember) => (
        <TeamMember key={t.name} teamMember={t} />
      ))}
      <hr />
      {team_member.map((t: ContentfulTeamMember) => (
        <TeamMember key={t.name} teamMember={t} />
      ))}
    </Container>
  );
}
