import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Day8_Part2 {
    public static final int right = 0;
    public static final int left = 1;
    public static final int up = 2;
    public static final int down = 3;

    public static void main(String[] args) throws IOException {

        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_8.txt"));

        List<String> rows = new ArrayList<>();

        String line;
        while ((line = bufferedReader.readLine()) != null) {
            rows.add(line);
        }

        int numRows = rows.size();
        int numCols = rows.get(0).length();

        int[][] matrix = new int[numRows][];

        int i = 0;
        for (String row : rows) {
            matrix[i] = new int[numCols];
            String[] rowArr = row.split("");
            int j = 0;
            for (String colStr : rowArr) {
                matrix[i][j] = Integer.parseInt(colStr);
                j++;
            }
            i++;
        }

        int largestScore = 0;
        for (int y = 0; y < numRows; y++) {
            for (int x = 0; x < numCols; x++) {
                int newScore = getScore(matrix, x, y);
                if (newScore > largestScore) {
                    largestScore = newScore;
                }
            }
        }

        System.out.println(largestScore);
    }

    private static int getScore(int[][] matrix, int x, int y) {
        int rightVal = numSeen(matrix, x - 1, y, matrix[y][x], right);
        int leftVal = numSeen(matrix, x + 1, y, matrix[y][x], left);
        int upVal = numSeen(matrix, x, y - 1, matrix[y][x], up);
        int downVal = numSeen(matrix, x, y + 1, matrix[y][x], down);

        return rightVal * leftVal * upVal * downVal;
    }

    public static int numSeen(int[][] matrix, int x, int y, int val, int direction) {
        switch (direction) {
            case right -> {
                if (x > -1) {
                    if (val > matrix[y][x]) {
                        return 1 + numSeen(matrix, x - 1, y, val, direction);
                    }
                    return 1;
                }
                return 0;
            }
            case left -> {
                if (x < matrix[0].length) {
                    if (val > matrix[y][x]) {
                        return 1 + numSeen(matrix, x + 1, y, val, direction);
                    }
                    return 1;
                }
                return 0;
            }
            case up -> {
                if (y > -1) {
                    if (val > matrix[y][x]) {
                        return 1 + numSeen(matrix, x, y - 1, val, direction);
                    }
                    return 1;
                }
                return 0;
            }
            case down -> {
                if (y < matrix.length) {
                    if (val > matrix[y][x]) {
                        return 1 + numSeen(matrix, x, y + 1, val, direction);
                    }
                    return 1;
                }
                return 0;
            }
        }
        return 0;
    }
}
