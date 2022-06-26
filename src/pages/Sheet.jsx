import React, { useCallback, useEffect, useState } from 'react';

import {
  SuperHeading,
  Heading,
  Separator,
  SubHeading,
  Title,
  BigText,
  Text,
  SmallText,
  ExtraSmallText,
  SolidContainer,
  Image,
  ALink,
  InputTextArea,
  PasswordInput,
  Checkbox,
  ImportantButton,
  GenericButton,
  GenericIconButton,
  Button,
  IconButton,
  Linker,
  Input,
} from '../components/Components';

import IncludeYesNo from '../components/includes/IncludeYesNo';
import IncludeEditSomething from '../components/includes/IncludeEditSomething';

import banner from '../assets/images/banner_purple.png';
import { useThemeStore } from '../stores/useThemeStore';

import Navbar from '../components/Navbar';
import Sidebar from '../components/includes/Sidebar';

export default function Sheet() {
  const { theme } = useThemeStore((state) => state);

  const [input, setInput] = useState('');
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [editingSomething, setEditingSomething] = useState(false);
  const [something, setSomething] = useState('');

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsActive(false);
      setEditingSomething(false);
      setSomething('');
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const _ = `
    bg-main-lightbg
    bg-main-light
    bg-main-primary
    bg-main-secondary
    bg-main-info
    bg-main-error
    bg-main-warning
    bg-main-success
    bg-main-dark
    bg-main-darkbg
    hover:bg-main-lightbg
    hover:bg-main-light
    hover:bg-main-primary
    hover:bg-main-secondary
    hover:bg-main-info
    hover:bg-main-error
    hover:bg-main-warning
    hover:bg-main-success
    hover:bg-main-dark
    hover:bg-main-darkbg
    focus:bg-main-lightbg
    focus:bg-main-light
    focus:bg-main-primary
    focus:bg-main-secondary
    focus:bg-main-info
    focus:bg-main-error
    focus:bg-main-warning
    focus:bg-main-success
    focus:bg-main-dark
    focus:bg-main-darkbg
    text-main-lightbg
    text-main-light
    text-main-primary
    text-main-secondary
    text-main-info
    text-main-error
    text-main-warning
    text-main-success
    text-main-dark
    text-main-darkbg
    border-main-lightbg
    border-main-light
    border-main-primary
    border-main-secondary
    border-main-info
    border-main-error
    border-main-warning
    border-main-success
    border-main-dark
    border-main-darkbg
    hover:border-main-lightbg
    hover:border-main-light
    hover:border-main-primary
    hover:border-main-secondary
    hover:border-main-info
    hover:border-main-error
    hover:border-main-warning
    hover:border-main-success
    hover:border-main-dark
    hover:border-main-darkbg
    focus:border-main-lightbg
    focus:border-main-light
    focus:border-main-primary
    focus:border-main-secondary
    focus:border-main-info
    focus:border-main-error
    focus:border-main-warning
    focus:border-main-success
    focus:border-main-dark
    focus:border-main-darkbg
    `;

  const flexClass = `w-full flex items-center border-2 border-main-dark border-opacity-25 p-2 rounded-lg mb-2 ${
    theme === 'light' ? 'hover:bg-main-darkbg' : 'hover:bg-main-lightbg'
  } bg-opacity-50 ease-in-out duration-400`;

  const makeColorDisplay = (color, text) => (
    <div className={flexClass}>
      <Text theme={theme} color={color} className="w-full lg:w-1/2">
        {text}
      </Text>

      <SolidContainer
        color={color}
        className="ml-2"
        width="full"
      ></SolidContainer>
    </div>
  );

  return (
    <div
      className={`w-full lg:h-screen ${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } ease-in-out duration-400 lg:pb-0 pb-20`}
    >
      <Navbar currentPage="sheet" />
      <div
        className={`w-full p-2 lg:px-0 lg:pb-0 pt-20 flex lg:overflow-y-hidden lg:h-full`}
      >
        <Sidebar currentPage="sheet" />
        <div className="w-full lg:p-8 flex flex-col lg:flex-row">
          <div className="w-full h-full lg:border-2 lg:border-main-primary lg:p-8 rounded lg:border-opacity-25 lg:overflow-y-scroll">
            <SuperHeading>This is a SuperHeading.</SuperHeading>
            <Heading>This is a Heading.</Heading>
            <SubHeading className="mb-2">This is a SubHeading.</SubHeading>
            <Title>This is a Title.</Title>

            <Separator />

            <BigText theme={theme}>This is big text.</BigText>
            <Text theme={theme}>This is regular text.</Text>
            <SmallText theme={theme}>This is small text.</SmallText>
            <ExtraSmallText theme={theme}>
              This is extra small text.
            </ExtraSmallText>

            <Separator />

            <Heading>
              Spartan Bold (700):
              ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
            </Heading>
            <SubHeading className="mb-2">
              Spartan Semi-Bold (500):
              ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
            </SubHeading>

            <Text theme={theme}>
              Noto Sans Regular (400):
              ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
            </Text>
            <SmallText theme={theme} className="mt-1">
              Noto Sans Light (300):
              ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
            </SmallText>

            <Text theme={theme} mono className="mt-1">
              Roboto Mono (300):
              ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
            </Text>

            <Separator />

            {makeColorDisplay('lightbg', 'Light BG: #EDF2F7')}
            {makeColorDisplay('light', 'Light: #D7DFE8')}
            {makeColorDisplay('primary', 'Primary: #9582F2')}
            {makeColorDisplay('secondary', 'Secondary: #06D5B3')}
            {makeColorDisplay('info', 'Info: #60A5FA')}
            {makeColorDisplay('error', 'Error: #E86B6B')}
            {makeColorDisplay('warning', 'Warning: #FB923C')}
            {makeColorDisplay('success', 'Success: #48BB78')}
            {makeColorDisplay('dark', 'Dark: #2D3748')}
            {makeColorDisplay('darkbg', 'Dark BG: #111827')}

            <Separator />

            <Title theme={theme} color="primary" smallerMobile>
              This is a sentence to test the Primary Color.
            </Title>

            <Title theme={theme} color="secondary" smallerMobile>
              This is a sentence to test the Secondary Color.
            </Title>

            <Title theme={theme} color="info" smallerMobile>
              This is a sentence to test the Info Color.
            </Title>

            <Title theme={theme} color="error" smallerMobile>
              This is a sentence to test the Error Color.
            </Title>

            <Title theme={theme} color="warning" smallerMobile>
              This is a sentence to test the Warning Color.
            </Title>

            <Title theme={theme} color="success" smallerMobile>
              This is a sentence to test the Success Color.
            </Title>

            <Separator />

            <Image src={banner} alt="banner" noRounded />

            <Separator />

            <div>
              <ALink href="https://api.kinesis.world" newtab>
                This is a link to Kinesis API.
              </ALink>
            </div>

            <div>
              <ALink color="info" href="/#/sheet">
                This is a another link that goes nowhere.
              </ALink>
            </div>

            <Separator />

            <div className="w-full lg:w-1/2">
              <Input
                title="Input"
                theme={theme}
                placeholder="This is an Input box! Try writing something..."
                value={input}
                change={(e) => setInput(e.target.value)}
                className="mb-2"
                noPadding
              />

              <InputTextArea
                title="TextArea"
                theme={theme}
                placeholder="This is a Textarea! Try writing something..."
                value={inputText}
                change={(e) => setInputText(e.target.value)}
                borderColor="secondary"
              />

              <PasswordInput
                title="PasswordInput"
                theme={theme}
                placeholder="This is a PasswordInput! Try writing something secret..."
                value={password}
                change={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                borderColor="error"
                className="mt-2"
              />
            </div>

            <Checkbox
              title="Checkbox"
              value={checked}
              change={() => setChecked((prev) => !prev)}
              className="mt-2"
            >
              <Text theme={theme}>This is a Checkbox!</Text>
            </Checkbox>

            <Separator />

            <div className="w-full lg:w-1/3">
              <ImportantButton
                title="Important Button"
                theme={theme}
                hoverCondition
              />
              <ImportantButton
                title="Important Button (Deactivated)"
                theme={theme}
                className="mt-2"
              />

              <GenericButton click={() => null}>Generic Button</GenericButton>
              <GenericButton
                click={() => null}
                className="p-2 bg-main-info rounded-lg w-full ease-in-out duration-400"
                color="darkbg"
              >
                Generic Button (Customized)
              </GenericButton>

              <GenericIconButton
                click={() => null}
                className="mt-2"
                icon="clipboard"
              >
                Generic Icon Button
              </GenericIconButton>

              <GenericIconButton
                click={() => null}
                className="p-2 bg-main-error rounded-lg w-full ease-in-out duration-400 justify-center mt-2"
                color="darkbg"
                icon="clipboard"
              >
                Generic Icon Button (Customized)
              </GenericIconButton>

              <Button theme={theme}>Normal Button</Button>
              <Button theme={theme} className="p-3 w-full justify-center">
                Normal Button (Customized)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
              >
                Normal Button (Colored)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                noBorder
              >
                Normal Button (Colored + No Border)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                notHover
              >
                Normal Button (Colored + No Hover)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                notHover
                noBorder
              >
                Normal Button (Colored + No Hover/Border)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                transparent
              >
                Normal Button (Transparent)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                transparent
                noBorder
              >
                Normal Button (Transparent + No Border)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                transparent
                notHover
              >
                Normal Button (Transparent + No Hover)
              </Button>
              <Button
                theme={theme}
                className="p-3 w-full justify-center"
                color="info"
                transparent
                notHover
                noBorder
              >
                Normal Button (T + No Hover/Border)
              </Button>

              <div className="w-full flex justify-center items-center mb-4">
                <IconButton
                  title="Icon Button"
                  condition
                  theme={theme}
                  icon="user-3"
                  className="mr-2"
                />

                <IconButton
                  title="Icon Button (Smaller)"
                  condition
                  theme={theme}
                  icon="user-3"
                  className="mr-2"
                  smaller
                />

                <IconButton
                  title="Icon Button (No Fill)"
                  condition
                  theme={theme}
                  icon="user-3"
                  className="mr-2"
                  noFill
                />

                <IconButton
                  title="Icon Button (No Fill + Smaller)"
                  condition
                  theme={theme}
                  icon="user-3"
                  className="mr-2"
                  noFill
                  smaller
                />

                <IconButton
                  title="Icon Button (Customized)"
                  condition
                  theme={theme}
                  icon="user-3"
                  className="mr-2 p-2 rounded-full w-10 h-10"
                />

                <IconButton
                  title="Icon Button (Customized + No Fill)"
                  condition
                  noFill
                  theme={theme}
                  icon="user-3"
                  className="mr-2 p-2 rounded-full w-10 h-10"
                />

                <IconButton
                  title="Icon Button (Customized + No Fill + Deactivated)"
                  noFill
                  theme={theme}
                  icon="user-3"
                  className="mr-2 p-2 rounded-full w-10 h-10"
                />
              </div>

              <Linker
                to="/sheet"
                title="Linker"
                condition
                theme={theme}
                icon="home-4"
              />

              <Linker
                to="/sheet"
                title="Linker (Customized)"
                condition
                theme={theme}
                icon="home-4"
                className="mt-2 p-2 rounded-lg w-full h-10"
              />

              <Linker
                to="/sheet"
                title="Linker (Customized + No Fill)"
                condition
                noFill
                theme={theme}
                icon="home-4"
                className="mt-2 p-2 rounded-lg w-full h-10"
              />

              <Linker
                to="/sheet"
                title="Linker (Customized + No Fill + Smaller)"
                condition
                noFill
                smaller
                theme={theme}
                icon="home-4"
                className="mt-2 p-2 rounded-lg w-full h-10"
              />

              <Separator />

              <div className="w-full">
                <Button
                  color="info"
                  theme={theme}
                  className="p-3 w-full justify-center uppercase"
                  click={() => setIsActive(true)}
                >
                  Bring up includes/YesNo
                </Button>

                <Button
                  color="info"
                  theme={theme}
                  className="p-3 w-full justify-center uppercase"
                  click={() => setEditingSomething(true)}
                >
                  Bring up includes/EditingSomething
                </Button>
              </div>
            </div>

            <Separator />
            <Separator />
            <Separator />
          </div>
        </div>
      </div>

      <IncludeYesNo
        isActive={isActive}
        setIsActive={setIsActive}
        nextCallback={() => setIsActive(false)}
        currentTerm="Are you sure that you want to do X?"
        theme={theme}
      />

      <IncludeEditSomething
        title="Enter a new Something..."
        isEditing={editingSomething}
        setIsEditing={setEditingSomething}
        value={something}
        setValue={setSomething}
        submitValue={() => {
          alert(`You inputted ${something}`);
          setSomething('');
          setEditingSomething(false);
        }}
        theme={theme}
      />
    </div>
  );
}
