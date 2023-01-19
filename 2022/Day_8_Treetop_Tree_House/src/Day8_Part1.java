import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Day8_Part1 {
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

        int count = 0;
        for (int y = 0; y < numRows; y++) {
            for (int x = 0; x < numCols; x++) {
                count += visible(matrix, x, y) ? 1 : 0;
            }
        }

        System.out.println(count);
    }

    public static int largest(int[][] matrix, int x, int y, int direction) {
        switch (direction) {
            case right:
                if (x > -1) {
                    int value = largest(matrix, x - 1, y, direction);
                    return Math.max(value, matrix[y][x]);
                } else {
                    return -1;
                }
            case left:
                if (x < matrix[0].length) {
                    int val = largest(matrix, x + 1, y, direction);
                    return Math.max(val, matrix[y][x]);
                } else {
                    return -1;
                }
            case up:
                if (y > -1) {
                    int val = largest(matrix, x, y - 1, direction);
                    return Math.max(val, matrix[y][x]);
                } else {
                    return -1;
                }
            case down:
                if (y < matrix.length) {
                    int val = largest(matrix, x, y + 1, direction);
                    return Math.max(val, matrix[y][x]);
                } else {
                    return -1;
                }
        }
        return -1;
    }

    public static boolean visible(int[][] matrix, int x, int y) {
        if (largest(matrix, x - 1, y, right) < matrix[y][x]) {
            return true;
        } else if (largest(matrix, x + 1, y, left) < matrix[y][x]) {
            return true;
        } else if (largest(matrix, x, y - 1, up) < matrix[y][x]) {
            return true;
        } else return largest(matrix, x, y + 1, down) < matrix[y][x];
    }
}
