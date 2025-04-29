document.addEventListener('DOMContentLoaded', function() {
    const pokemonForm = document.getElementById('pokemonForm');
    const searchBtn = document.getElementById('searchBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const searchName = document.getElementById('searchName');
    const pokemonResult = document.getElementById('pokemonResult');
    const statusMessage = document.getElementById('statusMessage');

    // Update this with your actual API URL when deployed
    const API_BASE_URL = 'https://final-project-394.onrender.com/api/Pokemon';

    // Add/Update Pokémon
    pokemonForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const type = document.getElementById('type').value;
        
        if (!name || !type) {
            showStatus('Name and type are required', 'error');
            return;
        }

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: name, 
                    type: type 
                }),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to add Pokémon');
            }
            
            showStatus('Pokémon added/updated successfully!', 'success');
            pokemonForm.reset();
        } catch (error) {
            showStatus(error.message, 'error');
            console.error('Error:', error);
        }
    });

    // Search Pokémon
    searchBtn.addEventListener('click', async function() {
        const name = searchName.value.trim();
        if (!name) {
            showStatus('Please enter a Pokémon name', 'error');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/${name}`);
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Pokémon not found');
            }
            
            const pokemon = await response.json();
            displayPokemon(pokemon);
            showStatus('Pokémon found!', 'success');
        } catch (error) {
            pokemonResult.innerHTML = '';
            showStatus(error.message, 'error');
            console.error('Error:', error);
        }
    });

    // Delete Pokémon
    deleteBtn.addEventListener('click', async function() {
        const name = searchName.value.trim();
        if (!name) {
            showStatus('Please enter a Pokémon name', 'error');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/${name}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                // Handle cases where response might not be JSON
                let errorMessage;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || 'Failed to delete Pokémon';
                } catch {
                    errorMessage = 'Failed to delete Pokémon';
                }
                throw new Error(errorMessage);
            }
    
            // Handle successful deletion
            pokemonResult.innerHTML = '';
            showStatus('Pokémon deleted successfully!', 'success');
            searchName.value = '';
        } catch (error) {
            showStatus(error.message, 'error');
            console.error('Error:', error);
        }
    });

    // Display Pokémon in the UI
    function displayPokemon(pokemon) {
        pokemonResult.innerHTML = `
            <div class="pokemon-card">
                <div class="pokemon-info">
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-type">Type: ${pokemon.type}</div>
                </div>
            </div>
        `;
    }

    // Show status messages
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 5000);
    }
});