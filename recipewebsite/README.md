# David's Recipes Website

A personal recipe sharing website built with HTML, CSS, and JavaScript. This project serves as both a recipe collection and a learning platform for web development.

## Live Demo

Visit the live website: [David's Recipes](https://vercel.com/davidlee000s-projects/recipewebsite)

## Features

- Browse recipes by categories (Pasta, Curry, Bread)
- User recipe submission system
- Contact form for user interaction
- Responsive design for all devices
- Recipe detail pages with ingredients and instructions
- User recipe management system

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js with Express
- Database: JSON Server for data persistence
- Dependencies:
  - express: ^4.18.2
  - json-server: ^0.17.4

## Project Structure

```
recipewebsite/
├── index.html              # Homepage
├── pasta.html             # Pasta recipes page
├── curry.html             # Curry recipes page
├── bread.html             # Bread recipes page
├── user-recipes.html      # User submitted recipes
├── submit-recipe.html     # Recipe submission form
├── contact.html           # Contact page
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript file
├── recipes.js             # Recipe data handling
├── user-recipes.js        # User recipe management
├── submit-recipe.js       # Recipe submission logic
├── recipe-detail.js       # Recipe detail page logic
├── contact.js             # Contact form handling
└── db.json                # Database file
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Davidlee000/recipewebsite.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Development

- Run the development server: `npm run dev`
- The JSON server will run on port 3000
- Changes to the code will automatically reflect in the browser

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the ISC License.

## Author

David Lee

## Acknowledgments

- Built as a learning project for web development
- Special thanks to the open-source community for their tools and resources

