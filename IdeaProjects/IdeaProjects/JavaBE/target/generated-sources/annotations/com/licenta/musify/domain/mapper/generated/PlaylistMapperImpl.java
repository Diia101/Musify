package com.licenta.musify.domain.mapper.generated;

import com.licenta.musify.domain.dto.PlaylistCreateDto;
import com.licenta.musify.domain.dto.PlaylistMyDto;
import com.licenta.musify.domain.dto.PlaylistUpdateDto;
import com.licenta.musify.domain.dto.PlaylistViewDto;
import com.licenta.musify.domain.dto.SongDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.mapper.PlaylistMapper;
import com.licenta.musify.domain.model.Playlist;
import com.licenta.musify.domain.model.Playlist.PlaylistBuilder;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.domain.model.User;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-03T04:03:37+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 23.0.2 (Amazon.com Inc.)"
)
@Component
public class PlaylistMapperImpl extends PlaylistMapper {

    private final DatatypeFactory datatypeFactory;

    public PlaylistMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public Playlist playlistCreateDtoToPlaylist(PlaylistCreateDto playlistCreateDto) {
        if ( playlistCreateDto == null ) {
            return null;
        }

        PlaylistBuilder playlist = Playlist.builder();

        playlist.name( playlistCreateDto.getName() );
        playlist.isPublic( playlistCreateDto.getIsPublic() );

        return playlist.build();
    }

    @Override
    public Playlist playlistUpdateDtoToPlaylist(PlaylistUpdateDto playlistUpdateDto) {
        if ( playlistUpdateDto == null ) {
            return null;
        }

        PlaylistBuilder playlist = Playlist.builder();

        playlist.name( playlistUpdateDto.getName() );
        playlist.isPublic( playlistUpdateDto.getIsPublic() );

        return playlist.build();
    }

    @Override
    public List<PlaylistMyDto> toListViewPrivateDto(List<Playlist> playlist) {
        if ( playlist == null ) {
            return null;
        }

        List<PlaylistMyDto> list = new ArrayList<PlaylistMyDto>( playlist.size() );
        for ( Playlist playlist1 : playlist ) {
            list.add( toViewDto( playlist1 ) );
        }

        return list;
    }

    @Override
    public Set<PlaylistMyDto> toSetViewPlaylists(Set<Playlist> playlists) {
        if ( playlists == null ) {
            return null;
        }

        Set<PlaylistMyDto> set = new HashSet<PlaylistMyDto>( Math.max( (int) ( playlists.size() / .75f ) + 1, 16 ) );
        for ( Playlist playlist : playlists ) {
            set.add( toViewDto( playlist ) );
        }

        return set;
    }

    @Override
    public PlaylistMyDto toViewDto(Playlist playlist) {
        if ( playlist == null ) {
            return null;
        }

        PlaylistMyDto playlistMyDto = new PlaylistMyDto();

        playlistMyDto.setCreatedDate( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( playlist.getCreatedDate() ), "yyyy-MM-dd" ) );
        playlistMyDto.setLastUpdateDate( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( playlist.getLastUpdateDate() ), "yyyy-MM-dd" ) );
        playlistMyDto.setPlaylistId( playlist.getPlaylistId() );
        playlistMyDto.setName( playlist.getName() );
        playlistMyDto.setIsPublic( playlist.getIsPublic() );
        playlistMyDto.setOwner( userToUserDto( playlist.getOwner() ) );

        return playlistMyDto;
    }

    @Override
    public PlaylistViewDto toPlaylistViewDto(Playlist playlist) {
        if ( playlist == null ) {
            return null;
        }

        PlaylistViewDto playlistViewDto = new PlaylistViewDto();

        playlistViewDto.setCreatedDate( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( playlist.getCreatedDate() ), "yyyy-MM-dd" ) );
        playlistViewDto.setLastUpdateDate( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( playlist.getLastUpdateDate() ), "yyyy-MM-dd" ) );
        playlistViewDto.setPlaylistId( playlist.getPlaylistId() );
        playlistViewDto.setName( playlist.getName() );
        playlistViewDto.setIsPublic( playlist.getIsPublic() );
        playlistViewDto.setOwner( userToUserDto( playlist.getOwner() ) );

        setListOfSongs( playlistViewDto, playlist );

        return playlistViewDto;
    }

    @Override
    public SongDto toSongViewDto(Song song) {
        if ( song == null ) {
            return null;
        }

        Integer id = null;
        String title = null;
        String alternative_title = null;
        Integer duration = null;
        String creation_date = null;
        String url = null;

        id = song.getId();
        title = song.getTitle();
        alternative_title = song.getAlternative_title();
        duration = song.getDuration();
        creation_date = xmlGregorianCalendarToString( dateToXmlGregorianCalendar( song.getCreation_date() ), null );
        url = song.getUrl();

        SongDto songDto = new SongDto( id, title, alternative_title, duration, creation_date, url );

        return songDto;
    }

    private String xmlGregorianCalendarToString( XMLGregorianCalendar xcal, String dateFormat ) {
        if ( xcal == null ) {
            return null;
        }

        if (dateFormat == null ) {
            return xcal.toString();
        }
        else {
            Date d = xcal.toGregorianCalendar().getTime();
            SimpleDateFormat sdf = new SimpleDateFormat( dateFormat );
            return sdf.format( d );
        }
    }

    private XMLGregorianCalendar dateToXmlGregorianCalendar( Date date ) {
        if ( date == null ) {
            return null;
        }

        GregorianCalendar c = new GregorianCalendar();
        c.setTime( date );
        return datatypeFactory.newXMLGregorianCalendar( c );
    }

    protected UserDto userToUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setUserId( user.getUserId() );
        userDto.setFirstname( user.getFirstname() );
        userDto.setLastname( user.getLastname() );
        userDto.setEmail( user.getEmail() );
        userDto.setUserPassword( user.getUserPassword() );
        userDto.setCountry( user.getCountry() );
        userDto.setBirthday( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( user.getBirthday() ), null ) );

        return userDto;
    }
}
