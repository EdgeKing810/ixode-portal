import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useThemeStore } from "../stores/useThemeStore";
import { useUserProfileStore } from "../stores/useUserProfileStore";
import { fetchData } from "../utils/data";

import Navbar from "../components/Navbar";
import Sidebar from "../components/includes/Sidebar";
import {
  ALink,
  ALinker,
  BigText,
  Heading,
  Linker,
  Separator,
  SmallText,
  Text,
  Title,
} from "../components/Components";

export default function Home() {
  const { theme } = useThemeStore((state) => state);
  const { profile } = useUserProfileStore((state) => state);

  const [data] = useState(fetchData().home);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!profile || !profile.id) {
        navigate("/");
      }
    }, 1000);

    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen ${
        theme === "light" ? "bg-main-lightbg" : "bg-main-darkbg"
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="home" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="home" />
        <div className="w-full lg:p-8 flex flex-col lg:flex-row">
          <div className="lg:w-2/3 h-auto w-full border-2 border-main-primary p-4 rounded border-opacity-25">
            <Heading className="mt-2">
              Hi <u className="text-main-secondary">{profile.first_name}</u> 👋!
            </Heading>

            <Text theme={theme} nobreak>
              We hope you're making progress on your project... Feel free to
              read the latest news about{" "}
              <ALink newtab href="https://blog.konnect.dev">
                Kinesis API
              </ALink>
              .<br /> We are giving our best to improve the product based on
              your feedback.
            </Text>

            <Separator />

            {data.blogPosts.map((d) => (
              <div className="mb-2 lg:mb-3" key={d.id}>
                <BigText theme={theme}>
                  <ALink
                    color={theme === "light" ? "darkbg" : "lightbg"}
                    href={d.href}
                    newtab
                    noopacity
                  >
                    {d.title}
                  </ALink>
                </BigText>
                <SmallText theme={theme} className="mt-1">
                  {d.description}
                </SmallText>
              </div>
            ))}

            <Linker
              theme={theme}
              className="p-2 rounded-lg justify-start uppercase w-full mt-4 lg:w-1/3"
              color={theme === "light" ? "darkbg" : "lightbg"}
              borderColor="primary"
              smaller
              transparent
              to="/blog"
              condition
              title="Read More on the Blog"
              icon="arrow-right-s"
              noFill
              reverseIcon
            />

            <Separator />

            <div className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2">
              {data.bottomNav.map((d) => (
                <ALinker
                  key={d.id}
                  theme={theme}
                  className="p-2 rounded-lg justify-start w-full mb-2 lg:mt-0"
                  color={theme === "light" ? "darkbg" : "lightbg"}
                  borderColor="primary"
                  transparent
                  href={d.link}
                  condition
                  icon={d.icon}
                  noFill
                  reverseIcon
                  iconClass={`text-2xl mr-4 text-main-${d.color}`}
                >
                  <div className="w-full">
                    <BigText
                      theme={theme}
                      color={theme === "light" ? "darkbg" : "lightbg"}
                      className="justify-start flex w-full"
                    >
                      {d.title}
                    </BigText>
                    <SmallText theme={theme} className="mt-1 text-left" nobreak>
                      {d.description}
                    </SmallText>
                  </div>
                </ALinker>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 h-auto w-full border-2 border-main-primary p-4 rounded lg:ml-4 border-opacity-25 mt-2 lg:mt-0">
            <Title
              className="mt-2"
              color={theme === "light" ? "darkbg" : "lightbg"}
            >
              Join the Community
            </Title>

            <SmallText theme={theme} className="mt-1" nobreak>
              Discuss with team members, contributors and developers on
              different channels.
            </SmallText>

            <Linker
              theme={theme}
              className="p-2 rounded-lg justify-start uppercase w-full mt-4 lg:w-1/2"
              color={theme === "light" ? "darkbg" : "lightbg"}
              borderColor="info"
              smaller
              transparent
              to="/roadmap"
              condition
              title="See our Roadmap"
              icon="arrow-right-s"
              noFill
              reverseIcon
            />

            <Separator />

            <div className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2">
              {data.sideNav.map((d) => (
                <ALinker
                  key={d.id}
                  theme={theme}
                  className="p-2 rounded-lg justify-start w-full mb-2 lg:mt-0"
                  color={theme === "light" ? "darkbg" : "lightbg"}
                  transparent
                  href={d.link}
                  condition
                  noFill={!d.fill}
                  icon={d.icon}
                  reverseIcon
                  iconClass={`text-2xl mr-4`}
                >
                  <BigText
                    theme={theme}
                    color={theme === "light" ? "darkbg" : "lightbg"}
                    className="justify-start flex w-full"
                  >
                    {d.name}
                  </BigText>
                </ALinker>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
