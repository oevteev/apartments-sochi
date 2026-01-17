/// <reference types="vite/client" />

// vite-imagetools module declarations
declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*?webp' {
  const src: string;
  export default src;
}

declare module '*&format=webp' {
  const src: string;
  export default src;
}
