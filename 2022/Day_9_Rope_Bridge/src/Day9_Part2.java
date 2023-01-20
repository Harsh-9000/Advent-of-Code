import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;

public class Day9_Part2 {
    private static final int size = 1000;
    private static final int[] coordinateSystem = new int[size * size];
    private static final int[] xRopeCoordinate = new int[10];
    private static final int[] yRopeCoordinate = new int[10];

    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_9.txt"));

        Arrays.fill(xRopeCoordinate, 500);
        Arrays.fill(yRopeCoordinate, 500);
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            String[] moves = line.split(" ");
            move(moves[0], Integer.parseInt(moves[1]));
        }

        count();
    }

    private static void count() {
        int numPositions = 0;
        for (int i = 0; i < size * size; i++) {
            if (coordinateSystem[i] > 0) {
                numPositions++;
            }
        }
        System.out.println(numPositions);
    }

    private static void move(String direction, int value) {
        for (int i = 0; i < value; i++) {
            oneStep(direction);
        }
    }

    private static void oneStep(String direction) {
        switch (direction) {
            case "U" -> yRopeCoordinate[0] = yRopeCoordinate[0] + 1;
            case "D" -> yRopeCoordinate[0] = yRopeCoordinate[0] - 1;
            case "R" -> xRopeCoordinate[0] = xRopeCoordinate[0] + 1;
            case "L" -> xRopeCoordinate[0] = xRopeCoordinate[0] - 1;
        }

        for (int i = 0; i < xRopeCoordinate.length - 1; i++) {
            if (Math.abs(xRopeCoordinate[i] - xRopeCoordinate[i + 1]) + Math.abs(yRopeCoordinate[i] - yRopeCoordinate[i + 1]) > 2) {
                if (xRopeCoordinate[i] > xRopeCoordinate[i + 1]) {
                    xRopeCoordinate[i + 1]++;
                } else {
                    xRopeCoordinate[i + 1]--;
                }
                if (yRopeCoordinate[i] > yRopeCoordinate[i + 1]) {
                    yRopeCoordinate[i + 1]++;
                } else {
                    yRopeCoordinate[i + 1]--;
                }
            } else if (Math.abs(xRopeCoordinate[i] - xRopeCoordinate[i + 1]) > 1) {
                if (xRopeCoordinate[i] > xRopeCoordinate[i + 1]) {
                    xRopeCoordinate[i + 1]++;
                } else {
                    xRopeCoordinate[i + 1]--;
                }
            } else if (Math.abs(yRopeCoordinate[i] - yRopeCoordinate[i + 1]) > 1) {
                if (yRopeCoordinate[i] > yRopeCoordinate[i + 1]) {
                    yRopeCoordinate[i + 1]++;
                } else {
                    yRopeCoordinate[i + 1]--;
                }
            }
        }

        coordinateSystem[yRopeCoordinate[9] * size + xRopeCoordinate[9]] = 1;
    }

    private static void printCoordinateSystem() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                System.out.print(coordinateSystem[i * size + j]);
            }
            System.out.println();
        }
    }
}
