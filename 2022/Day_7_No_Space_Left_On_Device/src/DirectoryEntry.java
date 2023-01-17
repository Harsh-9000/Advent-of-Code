import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class DirectoryEntry extends FileEntry {
    private final DirectoryEntry parentDirectory;
    private Map<String, FileEntry> files = new HashMap<>();

    public DirectoryEntry(DirectoryEntry parentDirectory, String name) {
        super(name, 0);
        this.parentDirectory = parentDirectory;
    }

    public Collection<FileEntry> getFiles() {
        return files.values();
    }

    public void addFile(FileEntry fileEntry) {
        files.put(fileEntry.getName(), fileEntry);
    }

    public long size() {
        long count = 0;
        for (FileEntry fileEntry : files.values()) {
            count = count + fileEntry.size();
        }
        return count;
    }

    public DirectoryEntry getParentDirectory() {
        return parentDirectory;
    }

    public DirectoryEntry getDirectory(String str) {
        return (DirectoryEntry) files.get(str);
    }
}
