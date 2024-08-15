package com.brajula.blinddate.entities.images;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.apache.commons.lang3.exception.ContextedRuntimeException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    @Transactional
    public ImageUploadResponse uploadImage(MultipartFile imageFile) throws IOException {
        var imageToSave =
                Image.builder()
                        .name(imageFile.getOriginalFilename())
                        .type(imageFile.getContentType())
                        .imageData(ImageUtils.compressImage(imageFile.getBytes()))
                        .build();
        imageRepository.save(imageToSave);
        return new ImageUploadResponse(imageToSave.id);
    }

    @Transactional
    public byte[] downloadImage(Long imageId) {
        Optional<Image> dbImage = imageRepository.findById(imageId);

        return dbImage.map(
                        image -> {
                            try {
                                return ImageUtils.decompressImage(image.getImageData());
                            } catch (DataFormatException | IOException exception) {
                                throw new ContextedRuntimeException(
                                                "Error downloading an image", exception)
                                        .addContextValue("Image ID", image.getId())
                                        .addContextValue("Image name", image.getName());
                            }
                        })
                .orElse(null);
    }

    // voor de seeder
    @Transactional
    public ImageUploadResponse uploadImage(byte[] imageData, String name, String type)
            throws IOException {
        var imageToSave =
                Image.builder()
                        .name(name)
                        .type(type)
                        .imageData(ImageUtils.compressImage(imageData))
                        .build();
        imageRepository.save(imageToSave);
        return new ImageUploadResponse(imageToSave.id);
    }
}
