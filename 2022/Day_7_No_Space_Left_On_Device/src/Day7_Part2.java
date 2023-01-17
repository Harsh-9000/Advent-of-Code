import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Day7_Part2 {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/Users/harsh/Desktop/IIITs/Advent of Code/2022/Input/Day_7.txt"));

        DirectoryEntry rootDirectory = new DirectoryEntry(null, "/");
        DirectoryEntry currentDirectory = rootDirectory;
        List<DirectoryEntry> allDirectories = new ArrayList<>();
        String line;

        while ((line = bufferedReader.readLine()) != null) {
            String[] commands = line.split(" ");
            if ("$".equals(commands[0])) {
                if ("cd".equals(commands[1])) {
                    if ("/".equals(commands[2])) {
                        currentDirectory = rootDirectory;
                    } else if ("..".equals(commands[2])) {
                        currentDirectory = currentDirectory.getParentDirectory();
                    } else {
                        currentDirectory = currentDirectory.getDirectory(commands[2]);
                    }
                }
            } else if ("dir".equals(commands[0])) {
                DirectoryEntry directoryEntry = new DirectoryEntry(currentDirectory, commands[1]);
                currentDirectory.addFile(directoryEntry);
                allDirectories.add(directoryEntry);
            } else {
                currentDirectory.addFile(new FileEntry(commands[1], Long.parseLong(commands[0])));
            }
        }

        long sizeRootDir = rootDirectory.size();
        long spaceAvailable = 70000000 - sizeRootDir;
        long spaceNeeded = 30000000 - spaceAvailable;

        List<DirectoryEntry> options = new ArrayList<>();

        for (DirectoryEntry directoryEntry : allDirectories) {
            if (directoryEntry.size() > spaceNeeded) {
                options.add(directoryEntry);
            }
        }

        options.add(rootDirectory);

        options.sort((a, b) -> (int) (a.size() - b.size()));

        System.out.println(options.get(0).size());
    }
}
