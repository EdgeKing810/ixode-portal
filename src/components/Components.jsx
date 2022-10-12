import React from 'react';
import { Link } from 'react-router-dom';

const GenericHeading = ({
  title,
  color,
  children,
  nobreak,
  className,
  notFull,
}) => (
  <div
    className={`text-${color} ${!notFull && 'w-full'} font-spartan ${
      !nobreak && 'break-all'
    } ${className}`}
    title={title}
  >
    {children}
  </div>
);

export const SuperHeading = ({ title, children, className }) => (
  <GenericHeading
    title={title}
    color="primary"
    nobreak={false}
    className={`text-3xl sm:text-6xl font-bold mb-2 ${className}`}
  >
    {children}
  </GenericHeading>
);

export const Heading = ({
  title,
  children,
  className,
  color,
  smallerOnMobile,
}) => (
  <GenericHeading
    title={title}
    color={color ? color : 'primary'}
    nobreak={false}
    className={`${
      smallerOnMobile ? 'text-base' : 'text-2xl'
    } sm:text-4xl font-bold mb-2 ${className}`}
  >
    {children}
  </GenericHeading>
);

export const SubHeading = ({
  title,
  children,
  className,
  color,
  nobreak,
  smallerOnMobile,
}) => (
  <GenericHeading
    title={title}
    color={color ? color : 'secondary'}
    nobreak={nobreak}
    className={`${
      smallerOnMobile ? 'text-base' : 'text-xl'
    } sm:text-2xl font-semibold ${className}`}
  >
    {children}
  </GenericHeading>
);

export const Title = ({
  title,
  children,
  className,
  color,
  smallerOnMobile,
}) => (
  <GenericHeading
    title={title}
    color={color ? color : 'secondary'}
    nobreak={false}
    className={`${
      smallerOnMobile ? 'text-base' : 'text-lg'
    } sm:text-xl ${className}`}
  >
    {children}
  </GenericHeading>
);

const GenericText = ({
  color,
  children,
  nobreak,
  mono,
  className,
  notFull,
}) => (
  <div
    className={`text-${color} ${!notFull && 'w-full'} font-spartan ${
      mono ? 'font-robomono' : 'font-noto'
    } ${!nobreak && 'break-all'} ${className}`}
  >
    {children}
  </div>
);

export const BigText = ({
  children,
  color,
  className,
  mono,
  smallerOnMobile,
  notFull,
}) => (
  <GenericText
    color={color ? color : 'base-content'}
    className={`${
      smallerOnMobile ? 'text-sm' : 'text-base'
    } sm:text-lg ${className} font-normal`}
    mono={mono}
    nobreak={false}
    notFull={notFull}
  >
    {children}
  </GenericText>
);

export const Text = ({
  children,
  color,
  className,
  mono,
  nobreak,
  smallerOnMobile,
  notFull,
}) => (
  <GenericText
    color={color ? color : 'base-content'}
    className={`${
      smallerOnMobile ? 'text-xs' : 'text-smZ'
    } sm:text-base ${className} font-normal`}
    mono={mono}
    nobreak={nobreak}
    notFull={notFull}
  >
    {children}
  </GenericText>
);

export const SmallText = ({ children, color, className, mono, nobreak }) => (
  <GenericText
    color={color ? color : 'base-content'}
    className={`text-xs sm:text-sm ${className} font-extralight mb-1`}
    mono={mono}
    nobreak={nobreak}
  >
    {children}
  </GenericText>
);

export const ALinkTo = ({
  to,
  children,
  color,
  className,
  noopacity,
  notfull,
  notnoto,
  newtab,
}) => (
  <Link
    to={to}
    className={`${color ? `text-${color}` : 'text-secondary'} outline-none ${
      !notfull && 'w-full'
    } ${!notnoto && 'font-noto'} ${className} 
    ${
      !noopacity && 'opacity-65'
    } hover:underline focus:underline hover:opacity-100 focus:opacity-100`}
    target={newtab ? '_blank' : '_self'}
    rel="noopenner noreferrer"
  >
    {children}
  </Link>
);

export const Input = ({
  title,
  value,
  placeholder,
  change,
  noBorder,
  noPadding,
  borderColor,
  className,
  type,
  noTransition,
  min,
  max,
  bigger,
}) => (
  <div
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'lg:p-2 p-1'} ${
      !noBorder &&
      `${borderColor ? `border-${borderColor}` : 'border-primary'} border-2`
    } hover:opacity-95 focus:opacity-95 font-noto flex justify-start items-center bg-opacity-50 ${className} ${
      !noTransition && 'ease-in-out duration-300'
    } text-sm lg:text-base`}
  >
    <input
      type={type ? type : 'text'}
      title={title}
      name={title}
      className={`w-full outline-none rounded-lg p-2 text-base-content ${
        bigger ? 'text-sm sm:text-lg' : 'text-xs sm:text-base'
      } bg-base-200 font-noto ${
        !noTransition && 'ease-in-out duration-300'
      } placeholder-base-content opacity-85 text-sm lg:text-base`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => change(e)}
      min={min ? min : 0}
      max={max ? max : 999999999999999}
    />
  </div>
);

export const InputSelect = ({
  noBorder,
  noPadding,
  borderColor,
  className,
  noTransition,
  children,
  value,
  change,
}) => (
  <select
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'lg:p-4 p-2'} ${
      !noBorder &&
      `${borderColor ? `border-${borderColor}` : 'border-primary'} border-2`
    } hover:opacity-95 focus:opacity-95 font-noto bg-opacity-50 ${className} ${
      !noTransition && 'ease-in-out duration-300'
    } text-sm lg:text-base bg-base-200`}
    value={value}
    onChange={(e) => change(e)}
  >
    {children}
  </select>
);

export const InputOption = ({ title, value, noTransition }) => (
  <option
    title={title}
    name={title}
    className={`w-full outline-none rounded-lg p-2 text-base-content text-xs sm:text-base bg-base-200 font-noto ${
      !noTransition && 'ease-in-out duration-300'
    } placeholder-base-content opacity-85 text-sm lg:text-base`}
    value={value}
  >
    {title}
  </option>
);

export const InputTextArea = ({
  title,
  value,
  placeholder,
  change,
  noBorder,
  noPadding,
  borderColor,
  className,
  type,
  min,
  max,
  bigger,
}) => (
  <div
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'p-2'} ${
      !noBorder &&
      `${borderColor ? `border-${borderColor}` : 'border-primary'} border-2`
    } hover:opacity-95 focus:opacity-95 bg-base-200 font-noto flex justify-start items-center bg-opacity-50 ${className}`}
  >
    <textarea
      title={title}
      type={type ? type : 'text'}
      name={title}
      className={`w-full outline-none rounded-lg p-2 bg-base-200 ${
        bigger ? 'text-sm sm:text-lg' : 'text-xs sm:text-base'
      } text-base-content font-noto placeholder-base-content opacity-85`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => change(e)}
      min={min ? min : 0}
      max={max ? max : 999999999999999}
    />
  </div>
);

export const PasswordInput = ({
  title,
  value,
  placeholder,
  change,
  noBorder,
  noPadding,
  borderColor,
  className,
  showPassword,
  setShowPassword,
  noTransition,
  min,
  max,
  bigger,
}) => (
  <div
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'p-2'} ${
      !noBorder &&
      `${borderColor ? `border-${borderColor}` : 'border-primary'} border-2`
    } hover:opacity-95 focus:opacity-95 bg-base-200 font-noto flex justify-start items-center bg-opacity-50 ${className} ${
      !noTransition && 'ease-in-out duration-300'
    }`}
  >
    <div
      className={`w-full bg-base-200 opacity-85 flex outline-none rounded-lg p-1`}
    >
      <input
        type={showPassword ? 'text' : 'password'}
        title={title}
        name={title}
        className={`w-full outline-none rounded-lg text-base-content ${
          bigger ? 'text-sm sm:text-lg' : 'text-xs sm:text-base'
        } font-noto ${
          !noTransition && 'ease-in-out duration-300'
        } placeholder-base-content bg-opacity-0 bg-base-200`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => change(e)}
        min={min ? min : 0}
        max={max ? max : 999999999999999}
      />

      <button
        name={`${showPassword ? 'Hide' : 'Show'} Password`}
        title={`${showPassword ? 'Hide' : 'Show'} Password`}
        className={`outline-none ml-2 ${
          bigger ? 'w-10 sm:w-12' : 'w-8 sm:w-10'
        } rounded-lg flex justify-center items-center text-base-content opacity-85`}
        onClick={(e) => {
          e.preventDefault();
          setShowPassword((prev) => !prev);
        }}
      >
        <p
          className={`ri-eye-${
            showPassword ? '' : 'off-'
          }line text-sm sm:text-lg`}
        ></p>
      </button>
    </div>
  </div>
);

export const Checkbox = ({
  value,
  noMargin,
  color,
  title,
  change,
  className,
  children,
}) => (
  <div
    className={`${!noMargin && 'my-2'} font-noto ${
      color ? `text-${color}` : 'text-primary'
    } flex items-center ${className}`}
  >
    <input
      type="checkbox"
      name={title}
      checked={value}
      value={value}
      onChange={(e) => change(e.target.checked)}
      className="opacity-85 hover:opacity-95 focus:opacity-95 w-4 h-4 mr-2 -mt-1"
    />
    {children}
  </div>
);

export const FullAbsoluteContainer = ({
  additional,
  additionalIn,
  children,
  outFunction,
  moreAdditional,
}) => (
  <div
    className={`w-screen fullabs ${additional} lg:h-full h-screen top-0 left-0 ${
      !additional.includes('z-') && 'z-20'
    } fixed transform ease-in-out duration-300`}
    onKeyPress={(e) => e.key === 'Escape' && outFunction()}
  >
    <div
      className={`bg-base-300 opacity-80 w-full h-full px-2 lg:px-0 ${additionalIn}`}
    >
      <div
        className={`${
          moreAdditional ? moreAdditional : `${additionalIn} w-full`
        }`}
      >
        {children}
      </div>
    </div>
  </div>
);

// Non-generated styles: text-error
