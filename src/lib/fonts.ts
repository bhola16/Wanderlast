import { Archivo, Cormorant_Garamond } from "next/font/google";

export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const wordmark = Archivo({
  subsets: ["latin"],
  weight: "900",
});
