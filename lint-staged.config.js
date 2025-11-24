/** @type {import('lint-staged').Config} */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'package.json': ['prettier --write'],
  '*.{css,scss,postcss,less}': ['prettier --write'],
  '*.md': ['prettier --write'],
};
