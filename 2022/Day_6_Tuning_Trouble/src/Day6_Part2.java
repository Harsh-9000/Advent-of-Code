import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;

public class Day6_Part2 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_6.txt"));

        String line;

        while ((line = bufferedReader.readLine()) != null) {
            String[] characters = line.split("");

            ArrayList<String> message = new ArrayList<>();

            int index = 0;

            for (String ch : characters) {
                if (message.size() > 13) {
                    if (message.size() == new HashSet<>(message).size()) {
                        break;
                    }
                    message.add(ch);
                    message.remove(0);
                } else {
                    message.add(ch);
                }
                index++;
            }

            System.out.println(index);
        }
    }
}
