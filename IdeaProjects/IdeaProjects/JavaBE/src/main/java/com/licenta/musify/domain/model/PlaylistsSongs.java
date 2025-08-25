package com.licenta.musify.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "playlists_songs")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistsSongs {

    @Id
    @GeneratedValue(generator = "playlists_songs_playlist_song_id_seq", strategy = GenerationType.AUTO)
    @SequenceGenerator(name = "playlists_songs_playlist_song_id_seq", allocationSize = 1)
    @Column(name = "playlist_song_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id", nullable = false)
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id", nullable = false)
    private Playlist playlist;

    @Column
    private Integer positionInPlaylist;

}
