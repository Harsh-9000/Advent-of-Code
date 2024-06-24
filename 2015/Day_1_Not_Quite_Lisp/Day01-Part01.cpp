#include <bits/stdc++.h>
using namespace std;

int getFloor(string input)
{
    int n = input.length();
    int count = 0;

    for (int i = 0; i < n; i++)
    {
        if (input[i] == '(')
        {
            count++;
        }
        else
        {
            count--;
        }
    }

    return count;
}

int main()
{
    ifstream inputFile("Day01.txt");

    if (!inputFile)
    {
        cerr << "Error opening file!" << endl;
        return 1;
    }

    string fileContents;
    string line;

    while (getline(inputFile, line))
    {
        fileContents += line;
    }

    inputFile.close();

    cout << getFloor(fileContents);

    return 0;
}