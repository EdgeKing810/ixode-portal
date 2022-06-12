import React from 'react';
import { Link } from 'react-router-dom';

export const SuperHeading = ({ title, children, className }) => (
  <div
    className={`text-main-primary w-full text-3xl sm:text-6xl font-bold font-spartan break-all mb-2 ${className}`}
    title={title}
  >
    {children}
  </div>
);

export const Heading = ({ title, children, color, className }) => (
  <div
    className={`${
      color ? `text-main-${color}` : 'text-main-primary'
    } w-full text-2xl sm:text-4xl font-bold font-spartan break-all mb-2 ${className}`}
    title={title}
  >
    {children}
  </div>
);

export const SubHeading = ({
  title,
  children,
  color,
  className,
  smallerOnMobile,
  nobreak,
}) => (
  <div
    className={`${
      color ? `text-main-${color}` : 'text-main-secondary'
    } w-full ${
      smallerOnMobile ? 'text-base' : 'text-xl'
    } sm:text-2xl font-semibold font-spartan ${
      !nobreak && 'break-all'
    } ${className}`}
    title={title}
  >
    {children}
  </div>
);

export const Title = ({ title, color, children, className, smallerMobile }) => (
  <div
    className={`${
      color ? `text-main-${color}` : 'text-main-secondary'
    } w-full ${
      smallerMobile ? 'text-base' : 'text-lg'
    } sm:text-xl font-spartan break-all mb-2 ${className}`}
    title={title}
  >
    {children}
  </div>
);

export const Separator = ({ smaller }) => (
  <div
    className={`pt-1 w-full bg-main-dark ${
      smaller ? 'my-2' : 'my-4'
    } rounded-lg opacity-25`}
  />
);

export const BigText = ({
  children,
  color,
  className,
  theme,
  mono,
  smallerOnMobile,
}) => (
  <div
    className={`${
      color
        ? `text-main-${color}`
        : theme === 'light'
        ? 'text-main-dark'
        : 'text-main-light'
    } ${className} ${
      smallerOnMobile ? 'text-sm' : 'text-base'
    } sm:text-lg font-normal ${mono ? 'font-robomono' : 'font-noto'} break-all`}
  >
    {children}
  </div>
);

export const Text = ({ children, color, className, theme, mono, nobreak }) => (
  <div
    className={`${
      color
        ? `text-main-${color}`
        : theme === 'light'
        ? 'text-main-dark'
        : 'text-main-light'
    } ${className} text-sm sm:text-base font-normal font-noto ${
      mono ? 'font-robomono' : 'font-noto'
    } ${!nobreak && 'break-all'}`}
  >
    {children}
  </div>
);

export const SmallText = ({
  children,
  color,
  className,
  theme,
  mono,
  nobreak,
}) => (
  <div
    className={`${
      color
        ? `text-main-${color}`
        : theme === 'light'
        ? 'text-main-dark'
        : 'text-main-light'
    } ${className} text-xs sm:text-sm font-extralight font-noto ${
      mono ? 'font-robomono' : 'font-noto'
    } mb-1 ${!nobreak && 'break-all'}`}
  >
    {children}
  </div>
);

export const ExtraSmallText = ({ children, color, className, theme, mono }) => (
  <div
    className={`${
      color
        ? `text-main-${color}`
        : theme === 'light'
        ? 'text-main-dark'
        : 'text-main-light'
    } ${className} text-xxs sm:text-xs font-extralight font-noto ${
      mono ? 'font-robomono' : 'font-noto'
    } mb-1 break-all`}
  >
    {children}
  </div>
);

export const SolidContainer = ({
  children,
  color,
  className,
  theme,
  width,
  height,
  noTransition,
}) => (
  <div
    className={`${
      color
        ? `bg-main-${color}`
        : theme === 'light'
        ? 'bg-main-dark'
        : 'bg-main-light'
    } ${className} ${width ? `w-${width}` : 'w-8'} ${
      height ? `h-${height}` : 'h-8'
    } ${!noTransition && 'ease-in-out duration-400'}`}
  >
    {children}
  </div>
);

export const Image = ({ src, alt, className, noRounded, noFill }) => (
  <img
    src={src}
    alt={alt}
    className={`${!noFill && 'object-fill'} flex justify-center ${
      !noRounded && 'rounded-full'
    } items-center ${className}`}
  />
);

export const ALink = ({
  href,
  children,
  color,
  className,
  noopacity,
  newtab,
}) => (
  <a
    href={href}
    className={`${
      color ? `text-main-${color}` : 'text-main-secondary'
    } outline-none w-full font-noto ${className} 
    ${
      !noopacity && 'opacity-65'
    } hover:underline focus:underline hover:opacity-100 focus:opacity-100`}
    target={newtab ? '_blank' : '_self'}
    rel="noopenner noreferrer"
  >
    {children}
  </a>
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
    className={`${
      color ? `text-main-${color}` : 'text-main-secondary'
    } outline-none ${!notfull && 'w-full'} ${
      !notnoto && 'font-noto'
    } ${className} 
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
  theme,
  className,
  type,
  noTransition,
  min,
  max,
}) => (
  <div
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'lg:p-2 p-1'} ${
      !noBorder &&
      `${
        borderColor ? `border-main-${borderColor}` : 'border-main-primary'
      } border-2`
    } hover:opacity-95 focus:opacity-95 ${
      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
    } font-noto flex justify-start items-center bg-opacity-50 ${className} ${
      !noTransition && 'ease-in-out duration-400'
    } text-sm lg:text-base`}
  >
    <input
      type={type ? type : 'text'}
      title={title}
      name={title}
      className={`w-full outline-none rounded-lg p-2 ${
        theme === 'light' ? 'text-main-darkbg' : 'text-main-lightbg'
      } text-xs sm:text-base ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } font-noto ${!noTransition && 'ease-in-out duration-400'} ${
        theme === 'light' ? 'placeholder-main-dark' : 'placeholder-main-light'
      } opacity-85 text-sm lg:text-base`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => change(e)}
      min={min ? min : 0}
      max={max ? max : 999999999999999}
    />
  </div>
);

export const InputTextArea = ({
  title,
  value,
  placeholder,
  change,
  noBorder,
  noPadding,
  borderColor,
  theme,
  className,
  noTransition,
}) => (
  <div
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'p-2'} ${
      !noBorder &&
      `${
        borderColor ? `border-main-${borderColor}` : 'border-main-primary'
      } border-2`
    } hover:opacity-95 focus:opacity-95 ${
      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
    } font-noto flex justify-start items-center bg-opacity-50 ${className} ${
      !noTransition && 'ease-in-out duration-400'
    }`}
  >
    <textarea
      title={title}
      name={title}
      className={`w-full outline-none rounded-lg p-2 ${
        theme === 'light' ? 'text-main-darkbg' : 'text-main-lightbg'
      } text-xs sm:text-base ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } font-noto ${!noTransition && 'ease-in-out duration-400'} ${
        theme === 'light' ? 'placeholder-main-dark' : 'placeholder-main-light'
      } opacity-85`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => change(e)}
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
  theme,
  className,
  showPassword,
  setShowPassword,
  noTransition,
}) => (
  <div
    className={`w-full rounded-lg opacity-75 ${!noPadding && 'p-2'} ${
      !noBorder &&
      `${
        borderColor ? `border-main-${borderColor}` : 'border-main-primary'
      } border-2`
    } hover:opacity-95 focus:opacity-95 ${
      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
    } font-noto flex justify-start items-center bg-opacity-50 ${className} ${
      !noTransition && 'ease-in-out duration-400'
    }`}
  >
    <div
      className={`w-full ${
        theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
      } opacity-85 flex outline-none rounded-lg p-2`}
    >
      <input
        type={showPassword ? 'text' : 'password'}
        title={title}
        name={title}
        className={`w-full outline-none rounded-lg ${
          theme === 'light' ? 'text-main-darkbg' : 'text-main-lightbg'
        } text-xs sm:text-base font-noto ${
          !noTransition && 'ease-in-out duration-400'
        } ${
          theme === 'light' ? 'placeholder-main-dark' : 'placeholder-main-light'
        } bg-opacity-0 ${theme === 'light' ? 'bg-main-light' : 'bg-main-dark'}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => change(e)}
      />

      <button
        className={`outline-none w-8 sm:w-10 rounded-lg flex justify-center items-center ${
          theme === 'light' ? 'text-main-darkbg' : 'text-main-lightbg'
        } opacity-85`}
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
  color,
  title,
  change,
  className,
  children,
}) => (
  <div
    className={`my-2 font-noto ${
      color ? `text-main-${color}` : 'text-main-primary'
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

export const ImportantButton = ({
  title,
  className,
  color,
  theme,
  hoverCondition,
  noTransition,
}) => (
  <button
    className={`font-noto tracking-wide ${
      color ? `text-main-${color}` : 'text-main-primary'
    } justify-center w-full lg:w-auto text-opacity-75 uppercase font-bold flex items-center sm:px-8 py-3 ${
      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
    } rounded-lg bg-opacity-75 ${
      hoverCondition ? 'hover:bg-opacity-90 focus:bg-opacity-90' : 'opacity-50'
    } outline-none ${className} ${!noTransition && 'ease-in-out duration-400'}`}
    type="submit"
  >
    {title}
  </button>
);

export const GenericButton = ({
  click,
  children,
  color,
  className,
  noTransition,
}) => (
  <button
    onClick={(e) => click(e)}
    className={`mt-2 ${
      color ? `text-main-${color}` : 'text-main-secondary'
    } outline-none text-xs sm:text-base font-semibold font-noto opacity-35 hover:opacity-65 focus:opacity-65 ${className} ${
      !noTransition && 'ease-in-out duration-400'
    }`}
  >
    {children}
  </button>
);

export const GenericIconButton = ({
  click,
  children,
  color,
  className,
  icon,
  extraSmall,
  noTransition,
}) => (
  <button
    type="button"
    onClick={(e) => click(e)}
    className={`${
      color ? `text-main-${color}` : 'text-main-secondary'
    } outline-none ${
      extraSmall ? 'text-xxs' : 'text-xs'
    } sm:text-sm font-noto opacity-80 hover:opacity-100 focus:opacity-100 flex ${className} ${
      !noTransition && 'ease-in-out duration-400'
    }`}
  >
    <>
      {children}
      {icon && (
        <span className={`ri-${icon}-line ml-2 flex items-center`}></span>
      )}
    </>
  </button>
);

export const Button = ({
  click,
  color,
  bgcolor,
  children,
  className,
  theme,
  transparent,
  notHover,
  noBorder,
  title,
  noTransition,
  noMargin,
  type,
}) => (
  <button
    title={title ? title : ''}
    type={type ? type : ''}
    className={`font-noto tracking-wide ${
      color ? `text-main-${color}` : 'text-main-primary'
    } text-opacity-75 ${!noMargin && 'my-2'} flex justify-center items-center ${
      transparent
        ? 'bg-transparent'
        : bgcolor
        ? `bg-main-${bgcolor}`
        : `${theme === 'light' ? 'bg-main-light' : 'bg-main-dark'}`
    } ${!noBorder && 'border-2 border-transparent rounded-lg'} outline-none ${
      !notHover
        ? color
          ? `hover:border-main-${color} focus:border-main-${color}`
          : 'hover:border-main-primary focus:border-main-primary'
        : ''
    } ${className} ${!noTransition && 'ease-in-out duration-400'}`}
    onClick={() => (click ? click() : null)}
  >
    {children}
  </button>
);

export const IconButton = ({
  click,
  title,
  icon,
  color,
  borderColor,
  theme,
  condition,
  className,
  smaller,
  noFill,
  noTransition,
}) => (
  <button
    title={title}
    onClick={() => (click ? click() : null)}
    className={`text-center ${
      smaller ? 'text-sm lg:text-lg' : 'text-lg'
    } border-2 border-transparent flex justify-center items-center ${
      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
    } ${
      condition
        ? color
          ? borderColor
            ? `hover:border-main-${borderColor} focus:border-main-${borderColor} hover:opacity-80 focus:opacity-80 text-main-${color}`
            : `hover:border-main-${color} focus:border-main-${color} hover:opacity-80 focus:opacity-80 text-main-${color}`
          : 'hover:border-main-primary focus:border-main-primary hover:opacity-80 focus:opacity-80 text-main-primary'
        : 'opacity-50 text-main-primary'
    } font-noto ${className} ${!noTransition && 'ease-in-out duration-400'}`}
  >
    {icon && (
      <div
        className={`h-full flex items-center ri-${icon}-${
          condition && !noFill ? 'fill' : 'line'
        }`}
      ></div>
    )}
  </button>
);

export const Linker = ({
  to,
  title,
  icon,
  theme,
  condition,
  className,
  smaller,
  noFill,
  noTransition,
  color,
  borderColor,
  reverseIcon,
}) => (
  <Link
    to={to}
    title={title}
    className={`${
      (!className || !className.includes('mt')) && 'mt-2'
    } text-center ${
      smaller ? 'text-sm lg:text-lg' : 'text-lg'
    } border-2 border-transparent flex ${
      (!className || !className.includes('justify')) && 'justify-center'
    } items-center ${theme === 'light' ? 'bg-main-light' : 'bg-main-dark'} ${
      color ? `text-main-${color}` : 'text-main-primary'
    } ${
      condition
        ? color
          ? borderColor
            ? `hover:border-main-${borderColor} focus:border-main-${borderColor} hover:opacity-80 focus:opacity-80`
            : `hover:border-main-${color} focus:border-main-${color} hover:opacity-80 focus:opacity-80`
          : 'hover:border-main-primary focus:border-main-primary hover:opacity-80 focus:opacity-80'
        : 'opacity-50'
    } font-noto ${className} ${!noTransition && 'ease-in-out duration-400'}`}
  >
    {icon && reverseIcon && (
      <div
        className={`mr-2 h-full flex items-center ri-${icon}-${
          condition && !noFill ? 'fill' : 'line'
        }`}
      ></div>
    )}
    {title && <div className={`h-full flex items-center`}>{title}</div>}
    {icon && !reverseIcon && (
      <div
        className={`ml-2 h-full flex items-center ri-${icon}-${
          condition && !noFill ? 'fill' : 'line'
        }`}
      ></div>
    )}
  </Link>
);

export const ALinker = ({
  href,
  title,
  icon,
  theme,
  condition,
  className,
  smaller,
  noFill,
  noTransition,
  color,
  borderColor,
  reverseIcon,
  iconClass,
  children,
}) => (
  <a
    href={href}
    title={title}
    className={`${
      (!className || !className.includes('mt')) && 'mt-2'
    } text-center ${
      smaller ? 'text-sm lg:text-lg' : 'text-lg'
    } border-2 border-transparent flex ${
      (!className || !className.includes('justify')) && 'justify-center'
    } items-center ${theme === 'light' ? 'bg-main-light' : 'bg-main-dark'} ${
      color ? `text-main-${color}` : 'text-main-primary'
    } ${
      condition
        ? color
          ? borderColor
            ? `hover:border-main-${borderColor} focus:border-main-${borderColor} hover:opacity-80 focus:opacity-80`
            : `hover:border-main-${color} focus:border-main-${color} hover:opacity-80 focus:opacity-80`
          : 'hover:border-main-primary focus:border-main-primary hover:opacity-80 focus:opacity-80'
        : 'opacity-50'
    } font-noto ${className} ${!noTransition && 'ease-in-out duration-400'}`}
  >
    {icon && reverseIcon && (
      <div
        className={`${
          (!iconClass || !iconClass.includes('mr')) && 'mr-2'
        } ${iconClass} h-full flex items-center ri-${icon}-${
          condition && !noFill ? 'fill' : 'line'
        }`}
      ></div>
    )}
    {children && <div className={`h-full flex items-center`}>{children}</div>}
    {icon && !reverseIcon && (
      <div
        className={`${
          (!iconClass || !iconClass.includes('ml')) && 'ml-2'
        } ${iconClass} h-full flex items-center ri-${icon}-${
          condition && !noFill ? 'fill' : 'line'
        }`}
      ></div>
    )}
  </a>
);

export const LinkerButton = ({
  click,
  title,
  icon,
  theme,
  condition,
  className,
  smaller,
  noFill,
  noTransition,
}) => (
  <button
    onClick={(e) => click(e)}
    title={title}
    className={`mt-2 text-center ${
      smaller ? 'text-sm lg:text-lg' : 'text-lg'
    } border-2 border-transparent flex justify-center items-center ${
      theme === 'light' ? 'bg-main-light' : 'bg-main-dark'
    } text-main-primary ${
      condition
        ? 'hover:border-main-primary focus:border-main-primary hover:opacity-80 focus:opacity-80'
        : 'opacity-50'
    } font-noto ${className} ${!noTransition && 'ease-in-out duration-400'}`}
  >
    {title && (
      <div className={`h-full flex items-center ${icon && 'mr-2'}`}>
        {title}
      </div>
    )}
    {icon && (
      <div
        className={`h-full flex items-center ri-${icon}-${
          condition && !noFill ? 'fill' : 'line'
        }`}
      ></div>
    )}
  </button>
);

export const FullAbsoluteContainer = ({
  additional,
  additionalIn,
  children,
  theme,
  outFunction,
  moreAdditional,
}) => (
  <div
    className={`w-screen ${additional} lg:h-full h-screen top-0 left-0 ${
      !additional.includes('z-') && 'z-20'
    } fixed transform ease-in-out duration-400`}
    onKeyPress={(e) => e.key === 'Escape' && outFunction()}
  >
    <div
      className={`${
        theme === 'light' ? 'bg-main-lightbg' : 'bg-main-darkbg'
      } opacity-95 w-full h-full px-2 lg:px-0 ${additionalIn}`}
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
