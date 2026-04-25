import Groq from "groq-sdk";
import { ReadmeFormSchema } from "./validation";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
