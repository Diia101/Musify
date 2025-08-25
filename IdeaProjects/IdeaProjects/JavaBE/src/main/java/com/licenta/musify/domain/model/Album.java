package com.licenta.musify.domain.model;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "albums")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "albums_album_id_seq")
    @SequenceGenerator(name = "albums_album_id_seq", allocationSize = 1)
    @Column(name = "album_id")
    private Integer albumId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "genre")
    private String genre;

    @Column(name = "release_date")
    private Date releaseDate;

    @Column(name = "label")
    private String label;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Song> songs = new ArrayList<>();

    public void addSongsToAlbum(Song song) {
        songs.add(song);
        song.setAlbum(this);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Album album = (Album) o;
        return Objects.equals(title, album.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title);
    }
}
