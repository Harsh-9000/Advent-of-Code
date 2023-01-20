import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Day9_Part1 {
    private static final int size = 1000;
    private static final int[] coordinateSystem = new int[size * size];
    private static int xHeadCoordinate = 500;
    private static int yHeadCoordinate = 500;
    private static int xTailCoordinate = 500;
    private static int yTailCoordinate = 500;

    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_9.txt"));

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
            case "U" -> yHeadCoordinate = yHeadCoordinate + 1;
            case "D" -> yHeadCoordinate = yHeadCoordinate - 1;
            case "R" -> xHeadCoordinate = xHeadCoordinate + 1;
            case "L" -> xHeadCoordinate = xHeadCoordinate - 1;
        }

        if (Math.abs(xHeadCoordinate - xTailCoordinate) > 1) {
            if ("R".equals(direction)) {
                xTailCoordinate = xTailCoordinate + 1;
            } else {
                xTailCoordinate = xTailCoordinate - 1;
            }
            yTailCoordinate = yHeadCoordinate;
        }
        if (Math.abs(yHeadCoordinate - yTailCoordinate) > 1) {
            if ("U".equals(direction)) {
                yTailCoordinate = yTailCoordinate + 1;
            } else {
                yTailCoordinate = yTailCoordinate - 1;
            }
            xTailCoordinate = xHeadCoordinate;
        }

        coordinateSystem[yTailCoordinate * size + xTailCoordinate] = 1;
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
