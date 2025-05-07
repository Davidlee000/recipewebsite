async function submitRecipe(event) {
    event.preventDefault();
    
    const formData = {
        title: document.getElementById('recipe-title').value,
        description: document.getElementById('recipe-description').value,
        ingredients: document.getElementById('recipe-ingredients').value
            .split('\n')
            .map(ing => {
                const [item, amount] = ing.split(':');
                return { item: item.trim(), amount: amount.trim() };
            }),
        instructions: document.getElementById('recipe-instructions').value
            .split('\n')
            .map(instruction => instruction.trim())
            .filter(instruction => instruction.length > 0)
    };

    try {
        const response = await fetch('http://localhost:3000/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Recipe submitted successfully!');
            window.location.href = '/';
        } else {
            alert('Error submitting recipe');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting recipe');
    }
}

document.querySelector('.recipe-form').addEventListener('submit', submitRecipe);

function showPreview(recipe) {
    // Show preview
    document.getElementById('preview').style.display = 'block';
    document.getElementById('previewContent').innerHTML = `
        <div class="recipe-preview">
            <h2>${recipe.name}</h2>
            <p>${recipe.description}</p>
        </div>
    `;
    
    // Generate HTML template
    const template = generateRecipeHTML(recipe);
    document.getElementById('generatedCode').value = template;
}

function generateRecipeHTML(recipe) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${recipe.name} - David's Recipes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>David's Recipes</h1>
        <nav class="main-nav">
            <ul class="nav-list">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="pasta.html" class="nav-link">Pasta</a></li>
                <li><a href="curry.html" class="nav-link">Curry</a></li>
                <li><a href="bread.html" class="nav-link">Bread</a></li>
                <li><a href="#" class="nav-link">About</a></li>
                <li><a href="#" class="nav-link">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="recipe-container">
        <div class="recipe-header" style="background-image: url('${recipe.imageUrl}')">
            <h1>${recipe.name}</h1>
        </div>
        
        <p>${recipe.description}</p>
        
        <div class="instructions">
            <h2>Ingredients</h2>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            
            <h2>Instructions</h2>
            <ol>
                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        
        <a href="index.html" class="back-link">← Back to Home</a>
    </main>
    
    <footer>
        <p>&copy; 2024 David's Recipes. All rights reserved.</p>
    </footer>
</body>
</html>`;
}

function copyCode() {
    const codeElement = document.getElementById('generatedCode');
    codeElement.select();
    document.execCommand('copy');
    alert('Code copied to clipboard!');
} 