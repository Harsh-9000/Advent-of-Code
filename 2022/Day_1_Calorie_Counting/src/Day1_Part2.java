import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

public class Day1_Part2 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_1.txt"));

        int calorie = 0;
        String line;
        ArrayList<Integer> calories = new ArrayList<>();

        while ((line = bufferedReader.readLine()) != null) {
            String strCal = line.trim();
            if (strCal.isBlank()) {
                calories.add(calorie);
                calorie = 0;
                continue;
            }
            calorie += Integer.parseInt(strCal);
        }
        calories.add(calorie);

        Collections.sort(calories);

        System.out.println(calories.get(calories.size() - 1) + calories.get(calories.size() - 2) + calories.get(calories.size() - 3));

        bufferedReader.close();
    }
}
