async function displayUserRecipes() {
    try {
        const recipes = await fetchRecipes();
        const recipeGrid = document.getElementById('recipe-grid');
        
        if (recipes.length === 0) {
            recipeGrid.innerHTML = `
                <div class="no-recipes">
                    <p>No recipes have been submitted yet.</p>
                    <a href="submit-recipe.html" class="view-recipe-btn">Submit a Recipe</a>
                </div>
            `;
            return;
        }

        recipeGrid.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <img src="${recipe.imageUrl || 'default-recipe-image.jpg'}" 
                     alt="${recipe.title || recipe.name}" 
                     onerror="this.src='default-recipe-image.jpg'">
                <div class="recipe-card-content">
                    <h3>${recipe.title || recipe.name}</h3>
                    <p class="date">Added: ${formatDate(recipe.dateAdded)}</p>
                    <p>${recipe.description}</p>
                    <a href="recipe.html?id=${recipe.id}" class="view-recipe-btn">View Recipe</a>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading recipes:', error);
        document.getElementById('recipe-grid').innerHTML = `
            <div class="error-message">
                <p>Error loading recipes. Please try again later.</p>
            </div>
        `;
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Load recipes when the page loads
document.addEventListener('DOMContentLoaded', displayUserRecipes); 