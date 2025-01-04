import {
  contentfulTeamPageIds,
  contentfulBoardPageIds,
  getContent,
  TeamContentfulPageKey,
  BoardContentfulPageKey,
} from "@/lib/contentful";
import { Document } from "@contentful/rich-text-types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "react-bootstrap";
import TeamMember, { TeamMemberProps } from "./TeamMember";
import { Fragment } from "react";

export async function getTeamMemberProps(locale: string) {
  const allTeamMemberProps = [];
  for (const slug of Object.keys(contentfulTeamPageIds)) {
    const data = await getContent(locale, slug as TeamContentfulPageKey);

    allTeamMemberProps.push({
      name: data.fields.name as string,
      title: data.fields.jobTitle as string,
      bio: data.fields.bio as Document,
      imgId: data.fields.cloudinaryId as string,
    });
  }
  return allTeamMemberProps;
}

export async function getBoardMemberProps(locale: string) {
  const allBoardMemberProps = [];
  for (const slug of Object.keys(contentfulBoardPageIds)) {
    const data = await getContent(locale, slug as BoardContentfulPageKey);

    allBoardMemberProps.push({
      name: data.fields.name as string,
      title: data.fields.jobTitle as string,
      bio: data.fields.bio as Document,
      imgId: data.fields.cloudinaryId as string,
    });
  }
  return allBoardMemberProps;
}

export default async function TeamMemberList({ locale }: { locale: string }) {
  setRequestLocale(locale);

  const allTeamMemberProps = await getTeamMemberProps(locale);
  const allBoardMemberProps = await getBoardMemberProps(locale);
  const t = await getTranslations("navigation");

  return (
    <Container className="vertical-rhythm">
      <h3>{t("theTeam.boardMembers")}</h3>
      {allBoardMemberProps.map((props: TeamMemberProps) => (
        <TeamMember key={props.name} {...props} />
      ))}
      <hr />
      {allTeamMemberProps.map((props: TeamMemberProps) => (
        <Fragment key={props.name}>
          {props.title.includes(t("theTeam.founder")) ? (
            <h3>{t("theTeam.founder")}</h3>
          ) : null}
          <TeamMember {...props} />
          {props.title.includes(t("theTeam.founder")) ? <hr /> : null}
        </Fragment>
      ))}
    </Container>
  );
}
