document.addEventListener('DOMContentLoaded', () => {
    const teamCountInput = document.getElementById('teamCount');
    const teamInputsContainer = document.getElementById('teamInputs');
    const generateButton = document.getElementById('generateButton');
    const matchesContainer = document.getElementById('matches');

    teamCountInput.addEventListener('input', () => {
        const count = parseInt(teamCountInput.value, 10);
        teamInputsContainer.innerHTML = '';

        if (count >= 2) {
            for (let i = 0; i < count; i++) {
                teamInputsContainer.innerHTML += `
                    <div class="mb-2">
                        <label for="team${i}" class="block text-sm font-medium">Team ${i + 1}:</label>
                        <input type="text" id="team${i}" class="input input-bordered w-full" />
                    </div>
                `;
            }
        }
    });

    generateButton.addEventListener('click', () => {
        const count = parseInt(teamCountInput.value, 10);
        const teams = [];

        if (count >= 2) {
            for (let i = 0; i < count; i++) {
                const teamName = document.getElementById(`team${i}`).value.trim();
                if (teamName) {
                    teams.push(teamName);
                }
            }

            if (teams.length === count) {
                generateMatches(teams);
            } else {
                alert('Please enter names for all teams.');
            }
        } else {
            alert('Number of teams should be at least 2.');
        }
    });

    function generateMatches(teams) {
        const matches = [];
        const n = teams.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                matches.push(`${teams[i]} vs ${teams[j]}`);
            }
        }

        matchesContainer.innerHTML = '<h2 class="text-4xl font-bold mb-10">Match Fixtures:</h2>';
        matches.forEach((match, index) => {
            matchesContainer.innerHTML += `<p class="text-3xl text-gray-600">Match ${index + 1} : <span class="text-3xl font-bold text-primary"> ${match}</span> </p>`;
        });
    }
});
