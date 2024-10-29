package web.service;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Arrays;

@Service
public class FileService {
    /*
        프로젝트명
            - build 폴더 : 배포된 클래스/파일 등
            - src 폴더 : 배포 전 개발자가 코드 및 파일 작성하는 곳
        빌드 : 내 코드를 웹서버에 올림/빌드함으로써 외부(클라이언트)로부터 리소스 제공 가능
    */
    // 2. 저장할 경로 만들기 (전역변수) * 개발자 코드 프로젝트의 upload 폴더 != 내장 웹서버의 upload 폴더
        // build 폴더 : 빌드된 웹서버의 폴더
    // 개발자 코드 프로젝트의 upload 폴더 (src->upload)
    // String uploadPath = "C:\\Users\\tj-bu-703-06\\Desktop\\TJ_2024A_Spring\\src\\main\\resources\\static\\upload\\";
    // 내장 웹서버의 upload 폴더 위치 (build->upload)
    // build 폴더는 매번 새로 빌드되는 폴더이므로 파일이 사라질 수 있다
    static String uploadPath = "C:\\Users\\tj-bu-703-008\\Desktop\\betnet\\build\\resources\\main\\static\\upload\\";
    // static 블록: 클래스가 로드될 때 한번만 실행된다.
    static{
        // uploadPath 주소 폴더가 없을 때 생성하기
        File directory = new File(uploadPath);
        if (!directory.exists()) {
            directory.mkdirs(); // 디렉토리가 존재하지 않으면 생성
        }
    }

    // 이미지 파일 업로드: 파일의 바이트가 저장된 MultipartFile 인터페이스를 받아 저장후 파일명 반환
    public String uploadImage(MultipartFile image, int mkId, int fileNum) {

        System.out.println(image.getOriginalFilename());
        System.out.println(image.getContentType());
        System.out.println(image.getSize());
        // 이미지 파일인지 확인
        if (image.getContentType() != null && image.getContentType().startsWith("image/")) {
            // 확장자 추출
            String originalFilename = image.getOriginalFilename();
            String extension = "";

            int lastIndexOfDot = originalFilename.lastIndexOf(".");
            if (lastIndexOfDot != -1) {
                extension = originalFilename.substring(lastIndexOfDot); // 확장자
            } else {
                return null; // 확장자가 없는 경우
            }
            // 1. 파일명 생성: image_{mkid}_{1~3번째 첨부파일}
            String fileName = String.format("image_%d_%d", mkId, fileNum) + extension;
            // 2. 저장할 경로와 파일명 합치기
            String filePath = uploadPath + fileName;
            // 3. 해당 경로로 설정한 file 객체, transferTo(file객체)
            File file = new File(filePath);
            // 4. transferTo(file객체) : file객체내 설정한 해당 경로로 파일 복사/저장/이동
            // 일반예외 예외처리
            System.out.println("file = " + file);
            try {
                image.transferTo(file);
                return fileName;
            } catch (IOException e) {
                System.out.println(e);
                return null;
            }
        } else {
            return null;
        }
    }

    // [3] 파일 이름으로 파일 삭제하기 (수정 및 삭제 모두 사용)
    public void deleteFile(String oldFileName) {
        // 파일 경로를 생성합니다.
        File file = new File(uploadPath, oldFileName);

        // 파일이 존재하는지 확인합니다.
        if (file.exists()) {
            // 파일을 삭제합니다.
            if (file.delete()) {
                System.out.println("파일이 삭제되었습니다: " + oldFileName);
            } else {
                System.err.println("파일 삭제 실패: " + oldFileName);
            }
        } else {
            System.err.println("파일이 존재하지 않습니다: " + oldFileName);
        }
    }


}
