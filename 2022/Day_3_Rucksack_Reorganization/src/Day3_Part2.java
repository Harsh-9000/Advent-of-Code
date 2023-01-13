import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Day3_Part2 {
    public static String commonChars(String str1, String str2) {

        if (str1.length() > 0 & str2.length() > 0) {

            List<Character> s1 = new ArrayList<>();
            List<Character> s2 = new ArrayList<>();

            for (int i = 0; i < str1.length(); i++) {
                s1.add(str1.charAt(i));
            }

            for (int i = 0; i < str2.length(); i++) {
                s2.add(str2.charAt(i));
            }

            s1.retainAll(s2);
            StringBuilder sb = new StringBuilder();

            for (Character c : s1) {
                sb.append(c);
            }

            return sb.toString();
        } else {
            return "";
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_3.txt"));

        String line;
        int priority = 0;
        List<String> rucksacks = new ArrayList<>();

        while ((line = bufferedReader.readLine()) != null) {
            rucksacks.add(line);
        }

        String rucksackOne;
        String rucksackTwo;
        String rucksackThree;

        for (int i = 0; i < rucksacks.size(); i = i + 3) {
            rucksackOne = rucksacks.get(i);
            rucksackTwo = rucksacks.get(i + 1);
            rucksackThree = rucksacks.get(i + 2);

            String temp = commonChars(rucksackOne, rucksackTwo);
            String temp2 = commonChars(temp, rucksackThree);
            char item = temp2.charAt(0);

            if (item >= 'a' && item <= 'z') {
                priority = priority + (int) item - 96;
            } else if (item >= 'A' && item <= 'Z') {
                priority = priority + (int) item - 38;
            }
        }

        System.out.println(priority);

        bufferedReader.close();
    }
}
