        for (int l = document[i].length(); l >= 0; l--)
        {
            if (isdigit(document[i][l]))
            {
                last = document[i][l];
                cout << last << endl;
                break;
            }
        }