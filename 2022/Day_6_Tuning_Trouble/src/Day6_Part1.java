import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Day6_Part1 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_6.txt"));

        ArrayList<Character> signal = new ArrayList<>();
        int ans = 0;

        int count = 0;
        while ((count = bufferedReader.read()) != -1) {
            signal.add((char) count);
        }

        for (int i = 0; i < signal.size() - 4; i++) {
            if (!(signal.get(i).equals(signal.get(i + 1))) && !(signal.get(i).equals(signal.get(i + 2))) && !(signal.get(i).equals(signal.get(i + 3))) && !(signal.get(i + 1).equals(signal.get(i + 2))) && !(signal.get(i + 1).equals(signal.get(i + 3))) && !(signal.get(i + 2).equals(signal.get(i + 3)))) {
                ans = i + 3 + 1;
                break;
            }
        }

        System.out.println(ans);
    }
}
