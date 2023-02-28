const palette = {
  primary: "#EBC72D",
  primaryLight: "#F7E289",
  complementary: "#6667AB",
  complementaryLight: "#9091AC",
  darkGreen: "#66a49a",
  disabled: "#BBF0DB",
  white: "#FFFFFF",
  black: "#000000",
  blackLight: "#535C68",
  blackLighter: "#818181",
  grey: "#9E9393",
  grey2: "#333333",
  border: "#CDD5E1",
  borderGray: "#EAEAEA",
  shadow01: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  shadow02: "0px 4px 4px rgba(0, 0, 0, 0.14)",
};

const typography = {
  title1: {
    fontSize: 30,
    letterSpacing: -0.54,
    lineHeight: 1.28,
  },
  title2: {
    fontSize: 25,
    letterSpacing: -0.8,
    lineHeight: 1.46,
  },
  title3: {
    fontSize: 20,
    letterSpacing: -0.59,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: 14,
    letterSpacing: -0.52,
    lineHeight: 1.43,
  },
  body2: {
    fontSize: 12,
    letterSpacing: -0.45,
    lineHeight: 1.5,
  },
  smallest: {
    fontSize: 10,
    letterSpacing: -0.37,
    lineHeight: 1.5,
  },
};

const theme = {
  palette,
  typography,
};

export const media = {
  desktop: "@media screen and (min-width: 1200px)",
  mobile: "@media screen and (max-width: 767px)",
  tablet: "@media screen and (max-width: 1260px)",
  tablet_mobile: "@media (max-width: 1260px) and (min-width: 768px)",
  desktop_mobile: "@media screen and (min-width: 768px)",
  desktop_tablet: "@media screen and (min-width: 1200px)",
};

export default theme;