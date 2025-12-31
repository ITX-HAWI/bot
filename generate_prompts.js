import fs from "fs";

// Read fruits from external file
const wordsFile = "fruit_list.txt";
const promptsFile = "generated_prompts.txt";

// Read and split lines, remove empty lines
const words = fs.readFileSync(wordsFile, "utf-8")
  .split("\n")
  .map(w => w.trim())
  .filter(w => w.length > 0);

const basePrompt = `
A cinematic close-up of tiny human construction workers harvesting a massive, real-life carrot embedded in the ground like a tree trunk. The scene takes place on a miniature dirt worksite with scaled-down tools, ladders, and tiny diggers. Workers in orange safety vests and hard hats climb the carrot, some rappelling with ropes. One cuts into the carrot with a buzzing miniature chainsaw. Dirt crumbles realistically. The lighting is golden-hour soft, with cinematic depth of field and smooth tracking camera motion that reveals more of the scene. Emphasize photorealism, intricate textures, and scale contrast between tiny workers and oversized food.
`;

// Clear output file before writing
fs.writeFileSync(promptsFile, "");

// Template-based enhancement function
const enhancePrompt = (word, prompt) => {
  return prompt
    .replace(/carrot/g, word.toLowerCase())
    + `\nEnhancements: ultra-detailed, cinematic lighting, photorealistic textures, dramatic depth of field, dynamic composition, vibrant colors, storytelling focus on the ${word.toLowerCase()}.`;
};

// Generate prompts
words.forEach(word => {
  const enhanced = enhancePrompt(word, basePrompt);
  fs.appendFileSync(promptsFile, `Prompt for "${word}":\n${enhanced}\n---\n`);
  console.log(`Generated prompt for ${word}`);
});

console.log(`All prompts saved to ${promptsFile}`);
