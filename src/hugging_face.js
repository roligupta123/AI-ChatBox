import { prevUser } from "./context/UserContext";

export async function query() {
// VITE_FAL_KEY='258b5e0c-b943-46d2-a42e-60154334ae25:1479522baf9c0e523eea7c04e3debf58';

  const response = await fetch("https://fal.run/fal-ai/fast-sdxl", {
    method: "POST",
    headers: {
      "Authorization": "Key " + import.meta.env.VITE_FAL_KEY,   
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prevUser.prompt
    }),
  });

  if (!response.ok) {
    throw new Error(`Fal.ai API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json(); // Fal.ai returns JSON with image URLs
  return result;
}
