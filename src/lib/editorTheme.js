export const customEditorTheme = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "7c7c7c", fontStyle: "italic" },
    { token: "keyword", foreground: "c792ea", fontStyle: "bold" },
    { token: "identifier", foreground: "82aaff" },
    { token: "string", foreground: "ecc48d" },
    { token: "number", foreground: "f78c6c" },
    { token: "delimiter", foreground: "89ddff" },
    { token: "type", foreground: "ffcb6b" },
    { token: "function", foreground: "82aaff", fontStyle: "bold" },
    { token: "variable", foreground: "f07178" },
    { token: "class", foreground: "ffcb6b", fontStyle: "bold" },
    { token: "interface", foreground: "ffcb6b", fontStyle: "bold" },
    { token: "namespace", foreground: "ffcb6b", fontStyle: "bold" },
    { token: "parameter", foreground: "f78c6c" },
    { token: "property", foreground: "82aaff" },
    { token: "punctuation", foreground: "89ddff" },
    { token: "operator", foreground: "89ddff" },
    { token: "regexp", foreground: "ecc48d" },
    { token: "decorator", foreground: "c792ea", fontStyle: "bold" },
    { token: "tag", foreground: "ff5370" },
    { token: "attribute.name", foreground: "c792ea" },
    { token: "attribute.value", foreground: "ecc48d" },
    { token: "meta.embedded", foreground: "ffffff" },
    { token: "meta.tag", foreground: "ff5370" },
    { token: "meta.tag.attributes", foreground: "c792ea" },
    { token: "meta.tag.content", foreground: "ffffff" },
  ],
  colors: {
    "editor.background": "#1e293b", // Tailwind bg-slate-800
    "editor.foreground": "#ffffff", // Tailwind text-white
    "editor.selectionBackground": "#ADD6FF4D", // Custom selection color
    "editor.lineHighlightBackground": "#2d3748", // Tailwind bg-gray-800
    "editorCursor.foreground": "#ffffff", // Tailwind text-white
    "editorWhitespace.foreground": "#4a5568", // Tailwind text-gray-600
    "editorIndentGuide.background": "#4a5568", // Tailwind text-gray-600
    "editorIndentGuide.activeBackground": "#a0aec0", // Tailwind text-gray-400
  },
};
