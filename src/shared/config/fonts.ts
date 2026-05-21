import localFont from "next/font/local";

export const sfProDisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/sf-pro-display-ultralight-italic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sf-pro-display-thin-italic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sf-pro-display-light-italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sf-pro-display-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sf-pro-display-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sf-pro-display-semibold-italic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sf-pro-display-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/sf-pro-display-heavy-italic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../../public/fonts/sf-pro-display-black-italic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
});
