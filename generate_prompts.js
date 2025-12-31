import fs from "fs";
import OpenAI from "openai";

// Your OpenAI API key will be set in GitHub Actions as a secret
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// List of fruits
const words = "Apple,Pear,Peach,Nectarine,Plum,Apricot,Cherry,Mango,Orange,Mandarin,Clementine,Tangerine,Lemon,Lime,Grapefruit,Pomelo,Avocado,Persimmon,Fig,Banana,Pineapple,Papaya,Guava,Lychee,Rambutan,Longan,Durian,Jackfruit,Passionfruit,Dragonfruit,Starfruit,Mangosteen,Breadfruit,Sapodilla,Soursop,Custardapple,Sugarapple,Strawberry,Blueberry,Raspberry,Blackberry,Cranberry,Gooseberry,Currantred,Currantblack,Currantwhite,Elderberry,Mulberry,Boysenberry,Cloudberry,Watermelon,Cantaloupe,Honeydew,Galiamelon,Crenshawmelon,Peach,Plum,Cherry,Apricot,Nectarine,Olive,Mango,Orange,Lemon,Lime,Grapefruit,Pomelo,Mandarin,Tangerine,Kumquat,Yuzu,Bergamot,Apple,Pear,Quince,Grape,Kiwi,Passionfruit,Tamarind,Carob,Cacao,Bael,Hornedmelon(Kiwano),Raisin,Date,Fig,Prune,Dried,apricot".split(",");

// Base prompt
const basePrompt = `
A cinematic close-up of tiny human construction workers harvesting a massive, real-life carrot embedded in the ground like a tree trunk. The scene takes place on a miniature dirt worksite with scaled-down tools, ladders, and tiny diggers. Workers in orange safety vests and hard hats climb the carrot, some rappelling with ropes. One cuts into the carrot with a buzzing miniature chainsaw. Dirt crumbles realistically. The lighting is golden-hour soft, with cinematic depth of field and smooth tracking camera motion that reveals more of the scene. Emphasize photorealism, intricate textures, and scale contrast between tiny workers and oversized food.
`;

// Output file
const outputFile = "generated_prompts.txt";
fs.writeFileSync(outputFile, ""); // clear file before writing

for (const word of words) {
  const promptForWord = basePrompt.replace(/carrot/g, word.toLowerCase());

  // AI enhancement
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "Enhance the prompt creatively for image generation." },
      { role: "user", content: `Enhance this prompt for "${word}": ${promptForWord}` }
    ],
    temperature: 0.8
  });

  const enhancedPrompt = response.choices[0].message.content;

  fs.appendFileSync(outputFile, `Prompt for "${word}":\n${enhancedPrompt}\n---\n`);
  console.log(`Generated enhanced prompt for ${word}`);
}

console.log(`All AI-enhanced prompts saved to ${outputFile}`);
