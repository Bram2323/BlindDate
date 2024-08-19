package com.brajula.blinddate.entities.images;

import jakarta.persistence.*;

import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Images")
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String type;

    // @Type(type = "org.hibernate.type.ImageType")
    @Lob private byte[] imageData;

    public Image(byte[] imageData) {
        this.imageData = imageData;
    }
}
