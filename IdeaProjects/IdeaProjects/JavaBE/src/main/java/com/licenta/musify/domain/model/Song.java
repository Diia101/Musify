package com.licenta.musify.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "songs")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Song {

    @Id
    @GeneratedValue(generator = "songs_song_id_seq", strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "songs_song_id_seq", allocationSize = 1)
    @Column(name = "song_id")
    private Integer id;

    @Column
    @NotBlank(message = "Title cannot be empty")
    private String title;

    @Column
    @NotBlank(message = "Alternative title cannot be empty")
    private String alternative_title;

    @Column
    @NotNull
    private Integer duration; //in min

    @Column
    @PastOrPresent
    private Date creation_date;

    @Column(name = "url", nullable = true)
    private String url;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Song)) return false;
        return id != null && id.equals(((Song) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();

    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "artists_songs",
            joinColumns = @JoinColumn(name = "song_id"),
            inverseJoinColumns = @JoinColumn(name = "artist_id")
    )
    private Set<Artist> artistsOfASong = new HashSet<>();


    public void addArtist(Artist artist) {
        artistsOfASong.add(artist);
        artist.getSongsOfAnArtist().add(this);
    }

    public void removeArtist(Artist artist) {
        artistsOfASong.remove(artist);
        artist.getSongsOfAnArtist().remove(this);
    }

    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlaylistsSongs> playlistsSongs = new ArrayList<>();

}
