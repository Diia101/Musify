package com.licenta.musify.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "artists")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Artist {
    @Id
    @GeneratedValue(generator = "artists_artist_id_seq", strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "artists_artist_id_seq", allocationSize = 1)
    @Column(name = "artist_id")
    private Integer artistId;


    @NotBlank(message = "Artist name cannot be empty")
    @Column(name = "artist_name")
    private String artistName;


    @NotEmpty(message = "Location cannot be empty.")
    @Column(name = "location")
    private String location;

    @Positive
    @Column(name = "active_period")
    private Integer activePeriod;

    @Column(name = "is_person")
    private boolean isPerson;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "artists_users", joinColumns = @JoinColumn(name = "artist_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> userList = new ArrayList<>();

    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Album> albums = new ArrayList<>();

    public void addAlbums(Album album) {
        albums.add(album);
        album.setArtist(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Artist)) return false;
        return artistId != null && artistId.equals(((Artist) o).getArtistId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }


    @ManyToMany(mappedBy = "artistsOfASong", cascade = CascadeType.ALL)
    private Set<Song> songsOfAnArtist = new HashSet<>();


}
