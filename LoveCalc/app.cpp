#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

// Function to calculate the "love score" based on the names
int calculateLoveScore(const string& name1, const string& name2) {
    // Combine the names
    string combinedNames = name1 + name2;
    
    // Convert all characters to lowercase and remove spaces
    transform(combinedNames.begin(), combinedNames.end(), combinedNames.begin(), ::tolower);
    combinedNames.erase(remove(combinedNames.begin(), combinedNames.end(), ' '), combinedNames.end());

    // Letter weights (a=1, b=2, ..., z=26)
    int totalWeight = 0;
    for (char ch : combinedNames) {
        if (ch >= 'a' && ch <= 'z') {
            totalWeight += (ch - 'a' + 1);
        }
    }

    // Calculate love score between 0-100
    return totalWeight % 101;
}

// Function to display a message based on the love score
void displayMessage(int loveScore) {
    if (loveScore > 80) {
        cout << "Wow! You two are a match made in heaven! 💕\n";
    } else if (loveScore > 50) {
        cout << "It's looking good! There's a strong connection. ❤️\n";
    } else {
        cout << "Hmm... It could use a little work, but who knows? 😅\n";
    }
}

int main() {
    string name1, name2;

    // Ask for names
    cout << "Enter your full name: ";
    getline(cin, name1);

    cout << "Enter their full name: ";
    getline(cin, name2);

    // Ensure both names are provided
    if (name1.empty() || name2.empty()) {
        cout << "Please enter both names!" << endl;
        return 1;
    }

    // Calculate the love score
    int loveScore = calculateLoveScore(name1, name2);

    // Display the love score and a message
    cout << "Your love score is " << loveScore << "%!" << endl;
    displayMessage(loveScore);

    return 0;
}
