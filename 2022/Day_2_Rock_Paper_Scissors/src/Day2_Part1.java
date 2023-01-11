import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Day2_Part1 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_2.txt"));

        String line;
        int score = 0;

        while ((line = bufferedReader.readLine()) != null) {
            if (line.equals("A X")) {
                score = score + 3 + 1;
            } else if (line.equals("B Y")) {
                score = score + 3 + 2;
            } else if (line.equals("C Z")) {
                score = score + 3 + 3;
            } else if (line.equals("A Y")) {
                score = score + 6 + 2;
            } else if (line.equals("B Z")) {
                score = score + 6 + 3;
            } else if (line.equals("C X")) {
                score = score + 6 + 1;
            } else if (line.equals("A Z")) {
                score = score + 3;
            } else if (line.equals("B X")) {
                score = score + 1;
            } else if (line.equals("C Y")) {
                score = score + 2;
            }
        }

        System.out.println(score);

        bufferedReader.close();
    }
}