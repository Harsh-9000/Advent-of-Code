import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Day10_Part1 {
    private static int count = 0;
    private static int x = 1;
    private static int signalStrength = 20;
    private static int totalSignalStrength = 0;

    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_10.txt"));

        String line;

        while ((line = bufferedReader.readLine()) != null) {
            String[] commands = line.split(" ");
            if ("noop".equals(commands[0])) {
                count++;
                signalStrength();
            } else if ("addx".equals(commands[0])) {
                count = count + 1;
                signalStrength();
                count = count + 1;
                signalStrength();
                x = x + Integer.parseInt(commands[1]);
            }
        }

        System.out.println(totalSignalStrength);
    }

    public static void signalStrength() {
        if (signalStrength == count) {
            totalSignalStrength = totalSignalStrength + (signalStrength * x);
            signalStrength = signalStrength + 40;
        }
    }
}
