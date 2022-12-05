package data.util;

import java.io.File;

public class DeletePhotoFile {
    public static void deletePhotoFile(String path, String original) { //(실제 파일부터 지우고 DB에서 파일명을 삭제해야 함. 파일명부터 삭제하면 파일을 찾을 수 없음)
        File file = new File(path + "/" + original);
        if (file.exists()){
            file.delete();
        }
    }
}
