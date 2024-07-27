// Fetch and use JSON data
document.addEventListener('DOMContentLoaded', () => {
    fetch('foodData.json')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('category');
            const itemSelect = document.getElementById('item');
            const detailsDiv = document.getElementById('details');
            
            // Populate categories dropdown
            for (const category in data.categories) {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = capitalizeFirstLetter(category);
                categorySelect.appendChild(option);
            }
            
            // Handle category change
            categorySelect.addEventListener('change', () => {
                const selectedCategory = categorySelect.value;
                itemSelect.innerHTML = '<option value="">--Select an Item--</option>';
                if (selectedCategory) {
                    data.categories[selectedCategory].forEach(item => {
                        const option = document.createElement('option');
                        option.value = item;
                        option.textContent = item;
                        itemSelect.appendChild(option);
                    });
                    itemSelect.disabled = false;
                } else {
                    itemSelect.disabled = true;
                }
                detailsDiv.classList.add('hidden');
            });
            
            // Handle item change
            itemSelect.addEventListener('change', () => {
                const selectedCategory = categorySelect.value;
                const selectedItem = itemSelect.value;
                const details = data[selectedCategory][selectedItem];
                
                if (details) {
                    document.getElementById('item-name').textContent = selectedItem;
                    document.getElementById('item-description').textContent = details.description;
                    
                    const benefitsList = document.getElementById('item-benefits');
                    benefitsList.innerHTML = '';
                    details.benefits.forEach(benefit => {
                        const li = document.createElement('li');
                        li.textContent = benefit;
                        benefitsList.appendChild(li);
                    });
                    
                    const nutritionalList = document.getElementById('item-nutritional');
                    nutritionalList.innerHTML = '';
                    for (const [key, value] of Object.entries(details.nutritionalValue)) {
                        const li = document.createElement('li');
                        li.textContent = `${key}: ${value}`;
                        nutritionalList.appendChild(li);
                    }
                    
                    document.getElementById('item-taste').textContent = details.taste;
                    
                    const incorporatingList = document.getElementById('item-incorporating');
                    incorporatingList.innerHTML = '';
                    details.incorporatingIntoDiet.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        incorporatingList.appendChild(li);
                    });
                    
                    detailsDiv.classList.remove('hidden');
                } else {
                    detailsDiv.classList.add('hidden');
                }
            });

            // Handle theme change
            document.querySelectorAll('.theme-controller').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelectorAll('.theme-controller').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    document.body.className = `bg-${button.value}-100`;
                });
            });

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        });
});
