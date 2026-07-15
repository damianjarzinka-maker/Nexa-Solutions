import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // One-off CommonJS build utility (favicon generation), not app code.
      "scripts/**",
      "postcss.config.mjs",
    ],
  },
];

export default eslintConfig;
