    package com.licenta.musify.domain.model;

    import com.licenta.musify.constant.Roles;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.Email;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import org.hibernate.annotations.JdbcType;
    import org.hibernate.dialect.PostgreSQLEnumJdbcType;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;

    import java.sql.Date;
    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.List;
    import java.util.Set;


    @Entity
    @Table(name = "users")
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class User implements UserDetails {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_user_id_seq")
        @SequenceGenerator(name = "users_user_id_seq", allocationSize = 1)
        @Column
        private Integer userId;

        @Column
        private String firstname;

        @Column
        private String lastname;

        @Column
        @Email
        private String email;

        @Column
        private String userPassword;

        @Column
        private String country;

        @Column
        @Enumerated(EnumType.STRING)
        @JdbcType(PostgreSQLEnumJdbcType.class)
        private Roles userType;

        @Column
        private Boolean isActive;

        @Column
        private Date birthday;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (userType == null) {
            return List.of();
        }
        return List.of(() -> userType.name());
    }


        @Override
        public String getPassword() {
            return userPassword;
        }

        @Override
        public String getUsername() {
            return email;
        }

        @ManyToMany(mappedBy = "userList", cascade = CascadeType.ALL)
        private List<Artist> artistList = new ArrayList<>();

        @ManyToMany(
                cascade = {
                        CascadeType.PERSIST, CascadeType.MERGE
                })
        @JoinTable(
                name = "users_playlists",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "playlist_id")
        )
        private Set<Playlist> followedPlaylists;

        public void addFollowedPlaylist(Playlist playlist) {
            basicAddFollowedPlaylist(playlist);
            playlist.basicAddFollower(this);
        }

        public void removeFollowedPlaylist(Playlist playlist) {
            basicRemoveFollowedPlaylist(playlist);
            playlist.basicRemoveFollower(this);
        }

        @OneToMany(
                mappedBy = "owner",
                cascade = CascadeType.ALL,
                orphanRemoval = true
        )
        private Set<Playlist> ownedPlaylists;

        @Column
        private String resetPasswordToken;

        void addOwnedPlaylist(Playlist playlist) {
            User oldOwner = playlist.getOwner();
            User newOwner = this;

            oldOwner.basicRemoveOwnedPlaylist(playlist);
            newOwner.basicAddOwnedPlaylist(playlist);

            playlist.basicSetOwner(newOwner);
        }

        void removeOwnedPlaylist(Playlist playlist) {
            playlist.basicSetOwner(null);
            basicRemoveOwnedPlaylist(playlist);
        }

        void basicAddFollowedPlaylist(Playlist playlist) {
            followedPlaylists.add(playlist);
        }

        void basicRemoveFollowedPlaylist(Playlist playlist) {
            followedPlaylists.remove(playlist);
        }

        void basicAddOwnedPlaylist(Playlist playlist) {
            ownedPlaylists.add(playlist);
        }

        void basicRemoveOwnedPlaylist(Playlist playlist) {
            ownedPlaylists.remove(playlist);
        }
    }
