const API_BASE_URL = 'https://final-project-394.onrender.com/api'; // Change to your deployed backend URL

document.addEventListener('DOMContentLoaded', () => {
    const pokemonForm = document.getElementById('pokemonForm');
    const searchBtn = document.getElementById('searchBtn');
    const getAllBtn = document.getElementById('getAllBtn');
    const searchName = document.getElementById('searchName');
    const pokemonResults = document.getElementById('pokemonResults');
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    // Handle form submission (POST)
    pokemonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();
        
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;

        try {
            showLoading();
            const response = await fetch(`${API_BASE_URL}/pokemon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, type })
            });

            if (!response.ok) throw new Error('Failed to save Pokémon');
            
            showSuccess(`Pokémon ${name} saved successfully!`);
            pokemonForm.reset();
        } catch (err) {
            showError(err.message);
        } finally {
            hideLoading();
        }
    });

    // Handle search (GET by name)
    searchBtn.addEventListener('click', async () => {
        const name = searchName.value.trim();
        if (!name) return;
        
        clearError();
        try {
            showLoading();
            const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
            
            if (!response.ok) throw new Error('Pokémon not found');
            
            const pokemon = await response.json();
            displayResults([pokemon]);
        } catch (err) {
            showError(err.message);
        } finally {
            hideLoading();
        }
    });

    // Handle get all (GET all)
    getAllBtn.addEventListener('click', async () => {
        clearError();
        try {
            showLoading();
            const response = await fetch(`${API_BASE_URL}/pokemon`);
            
            if (!response.ok) throw new Error('Failed to fetch Pokémon');
            
            const pokemons = await response.json();
            displayResults(pokemons);
        } catch (err) {
            showError(err.message);
        } finally {
            hideLoading();
        }
    });

    // Display results
    function displayResults(pokemons) {
        if (!pokemons || pokemons.length === 0) {
            pokemonResults.innerHTML = '<p>No Pokémon found</p>';
            return;
        }

        pokemonResults.innerHTML = pokemons.map(pokemon => `
            <div class="pokemon-card">
                <div>
                    <strong>${pokemon.name}</strong> - ${pokemon.type}
                </div>
                <button onclick="deletePokemon('${pokemon.name}')">Delete</button>
            </div>
        `).join('');
    }

    // Helper functions
    function showLoading() {
        loading.classList.remove('hidden');
        pokemonResults.classList.add('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
        pokemonResults.classList.remove('hidden');
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    function showSuccess(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        errorDiv.style.color = '#27ae60';
        setTimeout(() => errorDiv.classList.add('hidden'), 3000);
    }

    function clearError() {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
        errorDiv.style.color = '#e74c3c';
    }
});

// Global function for delete (DELETE)
async function deletePokemon(name) {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete Pokémon');
        
        document.getElementById('searchBtn').click(); // Refresh the current view
    } catch (err) {
        document.getElementById('error').textContent = err.message;
        document.getElementById('error').classList.remove('hidden');
    }
}