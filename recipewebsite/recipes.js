async function fetchRecipes() {
    try {
        const response = await fetch('http://localhost:3000/recipes');
        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

async function fetchRecipeById(id) {
    try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        const recipe = await response.json();
        return recipe;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return null;
    }
}

async function loadRecipes() {
    try {
        const response = await fetch('http://localhost:3000/recipes');
        const recipes = await response.json();
        
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <img src="${recipe.imageUrl}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load recipes');
    }
}

async function viewRecipe(id) {
    try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        const recipe = await response.json();
        
        // Navigate to recipe detail page
        window.location.href = `recipe.html?id=${id}`;
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load recipe');
    }
}

// Load recipes when page loads
document.addEventListener('DOMContentLoaded', loadRecipes); 