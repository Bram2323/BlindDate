package com.brajula.blinddate.entities.images;

import jakarta.persistence.*;

import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Setter private String name;
    @Setter private String type;

    // @Type(type = "org.hibernate.type.ImageType")
    @Lob private byte[] imageData;

    public Image(byte[] imageData) {
        this.imageData = imageData;
    }
}
