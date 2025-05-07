async function displayRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    const instructionsDiv = document.querySelector('.instructions');
    
    if (!recipeId) {
        showError('No recipe ID provided');
        return;
    }

    try {
        const recipe = await fetchRecipeById(recipeId);
        
        if (!recipe) {
            showError('Recipe not found');
            return;
        }

        // Update the page title
        document.title = `${recipe.title || recipe.name} | David's Recipes`;
        
        // Update the header
        document.querySelector('.recipe-header h1').textContent = recipe.title || recipe.name;
        
        // If there's an image, set it as the header background
        if (recipe.imageUrl) {
            document.querySelector('.recipe-header').style.backgroundImage = `url('${recipe.imageUrl}')`;
        }
        
        let ingredientsHtml = '';
        if (Array.isArray(recipe.ingredients)) {
            if (typeof recipe.ingredients[0] === 'object') {
                // Handle structured ingredients
                ingredientsHtml = `
                    <table>
                        <tr>
                            <th>Ingredient</th>
                            <th>Quantity</th>
                        </tr>
                        ${recipe.ingredients.map(ing => `
                            <tr>
                                <td>${ing.item}</td>
                                <td>${ing.amount}</td>
                            </tr>
                        `).join('')}
                    </table>
                `;
            } else {
                // Handle simple ingredients array
                ingredientsHtml = `
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                `;
            }
        }
        
        // Create instructions list
        const instructionsList = Array.isArray(recipe.instructions) 
            ? recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')
            : '<li>No instructions available</li>';
        
        instructionsDiv.innerHTML = `
            <h2>Ingredients</h2>
            ${ingredientsHtml}
            <h2>Instructions</h2>
            <ol>${instructionsList}</ol>
        `;
        
        if (recipe.dateAdded) {
            const dateElement = document.createElement('p');
            dateElement.className = 'date';
            dateElement.textContent = `Added: ${formatDate(recipe.dateAdded)}`;
            instructionsDiv.insertBefore(dateElement, instructionsDiv.querySelector('h2'));
        }

    } catch (error) {
        console.error('Error loading recipe:', error);
        showError('Failed to load recipe. Please try again.');
    }
}

function showError(message) {
    document.querySelector('.recipe-header h1').textContent = 'Error';
    document.querySelector('.instructions').innerHTML = `
        <div class="error-message">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="user-recipes.html" class="back-link">Back to Recipes</a>
        </div>
    `;
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

document.addEventListener('DOMContentLoaded', displayRecipe); 