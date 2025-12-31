import fs from "fs";

// Full list of fruits
const words = "Apple,Pear,Peach,Nectarine,Plum,Apricot,Cherry,Mango,Orange,Mandarin,Clementine,Tangerine,Lemon,Lime,Grapefruit,Pomelo,Avocado,Persimmon,Fig,Banana,Pineapple,Papaya,Guava,Lychee,Rambutan,Longan,Durian,Jackfruit,Passionfruit,Dragonfruit,Starfruit,Mangosteen,Breadfruit,Sapodilla,Soursop,Custardapple,Sugarapple,Strawberry,Blueberry,Raspberry,Blackberry,Cranberry,Gooseberry,Currantred,Currantblack,Currantwhite,Elderberry,Mulberry,Boysenberry,Cloudberry,Watermelon,Cantaloupe,Honeydew,Galiamelon,Crenshawmelon,Peach,Plum,Cherry,Apricot,Nectarine,Olive,Mango,Orange,Lemon,Lime,Grapefruit,Pomelo,Mandarin,Tangerine,Kumquat,Yuzu,Bergamot,Apple,Pear,Quince,Grape,Kiwi,Passionfruit,Tamarind,Carob,Cacao,Bael,Hornedmelon(Kiwano),Raisin,Date,Fig,Prune,Dried,apricot".split(",");

// Base prompt
const basePrompt = `
A cinematic close-up of tiny human construction workers harvesting a massive, real-life carrot embedded in the ground like a tree trunk. The scene takes place on a miniature dirt worksite with scaled-down tools, ladders, and tiny diggers. Workers in orange safety vests and hard hats climb the carrot, some rappelling with ropes. One cuts into the carrot with a buzzing miniature chainsaw. Dirt crumbles realistically. The lighting is golden-hour soft, with cinematic depth of field and smooth tracking camera motion that reveals more of the scene. Emphasize photorealism, intricate textures, and scale contrast between tiny workers and oversized food.
`;

const outputFile = "generated_prompts.txt";
fs.writeFileSync(outputFile, ""); // clear file before writing

// Template-based AI-style enhancement
const enhancePrompt = (word, prompt) => {
  return prompt
    .replace(/carrot/g, word.toLowerCase())
    + `\nEnhancements: ultra-detailed, cinematic lighting, photorealistic textures, dramatic depth of field, dynamic composition, vibrant colors, storytelling focus on the ${word.toLowerCase()}.`;
};

words.forEach(word => {
  const enhanced = enhancePrompt(word, basePrompt);
  fs.appendFileSync(outputFile, `Prompt for "${word}":\n${enhanced}\n---\n`);
  console.log(`Generated prompt for ${word}`);
});

console.log(`All prompts saved to ${outputFile}`);
