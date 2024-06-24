#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<string> document;
    string input;
    int answer = 0;

    while (true)
    {
        getline(cin, input);

        if (input == "end")
        {
            break;
        }

        document.push_back(input);
    }

    for (int i = 0; i < document.size(); i++)
    {
        string first, last;
        for (int f = 0; f < document[i].length(); f++)
        {
            if (isdigit(document[i][f]))
            {
                first = document[i][f];
                break;
            }
        }

        for (int l = document[i].length(); l >= 0; l--)
        {
            if (isdigit(document[i][l]))
            {
                last = document[i][l];
                break;
            }
        }

        string number = first + last;

        answer += stoi(number);
    }

    cout << answer;

    return 0;
}