import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useThemeStore } from '../stores/useThemeStore';
import { useUserProfileStore } from '../stores/useUserProfileStore';
import { fetchData } from '../utils/data';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';
import {
  BigText,
  Heading,
  SmallText,
  Text,
  Title,
} from '../components/Components';

export default function Home() {
  const { profile } = useUserProfileStore((state) => state);
  const { theme } = useThemeStore((state) => state);

  const [data] = useState(fetchData().home);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!profile || !profile.id) {
        navigate('/');
      }
    }, 1000);

    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full lg:h-screen bg-base-300 ease-in-out duration-300 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="home" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="home" />
        <div className="w-full lg:p-8 flex flex-col lg:flex-row">
          <div className="lg:w-2/3 h-auto w-full border-2 border-primary p-4 rounded border-opacity-25">
            <Heading className="mt-2">
              Hi <u className="text-secondary">{profile.first_name}</u> 👋!
            </Heading>

            <Text nobreak>
              We hope you're making progress on your project... Feel free to
              read the latest news about{' '}
              <a
                className="hover:underline focus:underline font-noto outline-none text-secondary"
                target="_blank"
                rel="noopenner noreferrer"
                href="https://blog.konnect.dev"
              >
                Kinesis API
              </a>
              .<br /> We are giving our best to improve the product based on
              your feedback.
            </Text>

            <ul
              className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`}
            />

            {data.blogPosts.map((d) => (
              <div className="mb-2 lg:mb-3" key={d.id}>
                <BigText>
                  <a
                    className="hover:underline focus:underline font-noto outline-none"
                    target="_blank"
                    rel="noopenner noreferrer"
                    href={d.href}
                  >
                    {d.title}
                  </a>
                </BigText>
                <SmallText className="mt-1">{d.description}</SmallText>
              </div>
            ))}

            <button
              onClick={() => {
                navigate('/blog');
              }}
              className={`btn flex justify-center gap-2 btn-secondary btn-outline mt-4 w-full lg:w-1/2`}
              title="Read More on the Blog"
            >
              <span className={`ri-arrow-right-s-line`} />
              Read More on the Blog
            </button>

            <div
              className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`}
            />

            <ul className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2 menu">
              {data.bottomNav.map((d) => (
                <li key={d.id}>
                  <a
                    href={d.link}
                    className={`btn btn-accent btn-outline h-20 lg:h-20 rounded-lg lg:mt-4 w-full mb-2`}
                  >
                    <div className="w-full flex gap-4 items-center normal-case">
                      <span
                        className={`text-2xl text-${d.color} ri-${d.icon}-line`}
                      />
                      <span className="w-full">
                        <BigText className="justify-start flex w-full">
                          {d.title}
                        </BigText>
                        <SmallText className="mt-1 text-left" nobreak>
                          {d.description}
                        </SmallText>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/3 h-auto w-full border-2 border-primary p-4 rounded lg:ml-4 border-opacity-25 mt-2 lg:mt-0">
            <Title
              className="mt-2"
              color={theme === 'light' ? 'darkbg' : 'lightbg'}
            >
              Join the Community
            </Title>

            <SmallText className="mt-1" nobreak>
              Discuss with team members, contributors and developers on
              different channels.
            </SmallText>

            <button
              onClick={() => {
                navigate('/roadmap');
              }}
              className={`btn flex justify-center gap-2 btn-secondary btn-outline mt-4 w-full`}
              title="See our Roadmap"
            >
              <span className={`ri-arrow-right-s-line`} />
              See our Roadmap
            </button>

            <div
              className={`pt-1 w-full bg-accent my-4 rounded-lg opacity-25`}
            />

            <ul className="w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2">
              {data.sideNav.map((d) => (
                <li key={d.id}>
                  <a
                    href={d.link}
                    className={`btn btn-accent btn-outline rounded-lg w-full mb-2`}
                    target="_blank"
                    rel="noopenner noreferrer"
                  >
                    <div className="w-full flex gap-4 items-center normal-case">
                      <span
                        className={`text-2xl font-normal text-base-content ri-${
                          d.icon
                        }-${d.fill ? 'fill' : 'line'}`}
                      />
                      <span className="w-full">
                        <BigText className="justify-start flex w-full">
                          {d.name}
                        </BigText>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
