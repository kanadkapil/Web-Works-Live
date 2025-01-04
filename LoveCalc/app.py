import random

def calculate_love_score(name1, name2):
    # Combine the names into one string and remove spaces
    combined_names = (name1 + name2).lower().replace(" ", "")
    
    # Assign a "weight" to each letter in the alphabet based on its position (a=1, b=2, ..., z=26)
    letter_weights = {chr(i): i - 96 for i in range(97, 123)}
    
    # Sum the weights of all letters in the combined names
    total_weight = sum(letter_weights.get(char, 0) for char in combined_names)
    
    # Generate a love score percentage (we can make it more complex or quirky, this is just for fun!)
    love_score = total_weight % 101  # Modulo 101 to keep the score between 0 and 100
    
    return love_score

def main():
    print("Welcome to the Love Calculator!")
    name1 = input("Enter your full name: ").strip()
    name2 = input("Enter the name of the person you're interested in: ").strip()
    
    love_percentage = calculate_love_score(name1, name2)
    
    print(f"\nYour love score is {love_percentage}%!")
    if love_percentage > 80:
        print("Wow! You two are a match made in heaven! 💕")
    elif love_percentage > 50:
        print("It's looking good! There's a strong connection. ❤️")
    else:
        print("Hmm... It could use a little work, but who knows? 😅")

if __name__ == "__main__":
    main()
