package com.licenta.musify.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SortComparator;

import java.sql.Date;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

@Entity
@Table(name = "playlists")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "playlists_playlist_id_seq")
    @SequenceGenerator(name = "playlists_playlist_id_seq", allocationSize = 1)
    @Column
    private Integer playlistId;

    @Column
    private String name;

    @OneToMany(
            mappedBy = "playlist",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @SortComparator(PlaylistSongComparator.class)
    private SortedSet<PlaylistsSongs> playlistsSongs = new TreeSet<>(new PlaylistSongComparator());

    @Column
    private Boolean isPublic;

    @Column
    private Date createdDate;

    @Column
    private Date lastUpdateDate;

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST, CascadeType.MERGE
            })
    @JoinTable(
            name = "users_playlists",
            joinColumns = @JoinColumn(name = "playlist_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> followers;

    public void addFollower(User follower) {
        basicAddFollower(follower);
        follower.basicAddFollowedPlaylist(this);
    }

    public void removeFollower(User follower) {
        basicRemoveFollower(follower);
        follower.basicRemoveFollowedPlaylist(this);
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    public void setOwner(User owner) {
        User oldOwner = this.owner;
        User newOwner = owner;

        basicSetOwner(newOwner);
        if (oldOwner != null)
            oldOwner.basicRemoveOwnedPlaylist(this);
        newOwner.basicAddOwnedPlaylist(this);
    }

    void basicAddFollower(User follower) {
        followers.add(follower);
    }

    void basicRemoveFollower(User follower) {
        followers.remove(follower);
    }

    void basicSetOwner(User owner) {
        this.owner = owner;
    }
}

