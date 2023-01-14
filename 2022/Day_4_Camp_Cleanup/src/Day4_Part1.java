import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Day4_Part1 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_4.txt"));

        String line;
        int count = 0;

        while ((line = bufferedReader.readLine()) != null) {
            String[] elfAssign = line.split(",");

            String[] assignOne = elfAssign[0].split("-");
            String[] assignTwo = elfAssign[1].split("-");

            int assignOneLow = Integer.parseInt(assignOne[0]);
            int assignOneHigh = Integer.parseInt(assignOne[1]);
            int assignTwoLow = Integer.parseInt(assignTwo[0]);
            int assignTwoHigh = Integer.parseInt(assignTwo[1]);

            if ((assignOneLow >= assignTwoLow && assignOneHigh <= assignTwoHigh) || (assignTwoLow >= assignOneLow && assignTwoHigh <= assignOneHigh)) {
                count++;
            }
        }

        System.out.println(count);

        bufferedReader.close();
    }
}
