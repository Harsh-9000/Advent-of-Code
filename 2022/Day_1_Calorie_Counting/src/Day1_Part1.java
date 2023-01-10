import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Day1_Part1 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_1.txt"));

        int calorie = 0;
        int mostCalories = 0;
        String line;

        while ((line = bufferedReader.readLine()) != null) {
            String strCal = line.trim();
            if (strCal.isBlank()) {
                if (mostCalories < calorie) {
                    mostCalories = calorie;
                }
                calorie = 0;
                continue;
            }
            calorie += Integer.parseInt(strCal);
        }

        if (mostCalories < calorie) {
            mostCalories = calorie;
        }

        System.out.println(mostCalories);

        bufferedReader.close();
    }
}
