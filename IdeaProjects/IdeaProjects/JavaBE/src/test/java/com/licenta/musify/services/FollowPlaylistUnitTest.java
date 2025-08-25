package com.licenta.musify.services;

import com.licenta.musify.constant.Roles;
import com.licenta.musify.domain.dao.impl.PlaylistDaoImpl;
import com.licenta.musify.domain.dto.UserFollowPlaylistDto;
import com.licenta.musify.domain.model.Playlist;
import com.licenta.musify.domain.model.PlaylistSongComparator;
import com.licenta.musify.domain.model.User;
import com.licenta.musify.repository.PlaylistRepository;
import com.licenta.musify.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.TreeSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FollowPlaylistUnitTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PlaylistRepository playlistRepository;

    @InjectMocks
    private PlaylistDaoImpl playlistDao;

    @Test
    public void whenFollowPlaylist_happyFlow() {
        Playlist playlist = new Playlist(1, "pl1",
                new TreeSet<>(new PlaylistSongComparator()), true,
                Date.valueOf("2000-01-01"), Date.valueOf("2000-01-01"),
                new HashSet<>(), null);

        User userOwner = new User(1, "fn1", "ln1", "email1@email.com", "pass1",
                "Country1", Roles.REGULAR, true,
                Date.valueOf("1999-01-01"), new ArrayList<>(), new HashSet<>(), new HashSet<>(), "");

        User userFollower = new User(2, "fn2", "ln2", "email2@email.com", "pass2",
                "Country2", Roles.REGULAR, true,
                Date.valueOf("1999-01-01"), new ArrayList<>(), new HashSet<>(), new HashSet<>(), "");

        userOwner.getOwnedPlaylists().add(playlist);
        playlist.setOwner(userOwner);

        UserFollowPlaylistDto dto = new UserFollowPlaylistDto();
        dto.setUserId(2);

        when(userRepository.findById(2)).thenReturn(Optional.of(userFollower));
        when(playlistRepository.findById(1)).thenReturn(Optional.of(playlist));

        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        playlistDao.followPlaylist(1, dto);

        verify(userRepository).save(userFollower);
        assertThat(userFollower.getFollowedPlaylists()).containsExactly(playlist);
    }
}
