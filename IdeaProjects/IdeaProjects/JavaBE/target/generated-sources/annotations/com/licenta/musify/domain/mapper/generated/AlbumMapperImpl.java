package com.licenta.musify.domain.mapper.generated;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.domain.dto.SongDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.mapper.AlbumMapper;
import com.licenta.musify.domain.model.Album;
import com.licenta.musify.domain.model.Album.AlbumBuilder;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.domain.model.User;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import javax.annotation.processing.Generated;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-03T04:03:36+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 23.0.2 (Amazon.com Inc.)"
)
@Component
public class AlbumMapperImpl extends AlbumMapper {

    private final DatatypeFactory datatypeFactory;

    public AlbumMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public AlbumDto toViewDto(Album album) {
        if ( album == null ) {
            return null;
        }

        AlbumDto albumDto = new AlbumDto();

        albumDto.setArtist( artistToArtistDto( album.getArtist() ) );
        albumDto.setReleaseDate( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( album.getReleaseDate() ), "yyyy-MM-dd" ) );
        albumDto.setAlbumId( album.getAlbumId() );
        albumDto.setTitle( album.getTitle() );
        albumDto.setDescription( album.getDescription() );
        albumDto.setGenre( album.getGenre() );
        albumDto.setLabel( album.getLabel() );
        albumDto.setSongs( songListToSongDtoList( album.getSongs() ) );

        setListOfUsers( albumDto, album );

        return albumDto;
    }

    @Override
    public UserDto toUserDto(User user) {
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

    @Override
    public Album toEntity(AlbumsCreateDto albumCreateDto) {
        if ( albumCreateDto == null ) {
            return null;
        }

        AlbumBuilder album = Album.builder();

        album.title( albumCreateDto.getTitle() );
        album.description( albumCreateDto.getDescription() );
        album.genre( albumCreateDto.getGenre() );
        album.releaseDate( albumCreateDto.getReleaseDate() );
        album.label( albumCreateDto.getLabel() );

        return album.build();
    }

    @Override
    public List<AlbumDto> toListViewDto(List<Album> albumList) {
        if ( albumList == null ) {
            return null;
        }

        List<AlbumDto> list = new ArrayList<AlbumDto>( albumList.size() );
        for ( Album album : albumList ) {
            list.add( toViewDto( album ) );
        }

        return list;
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

    protected ArtistDto artistToArtistDto(Artist artist) {
        if ( artist == null ) {
            return null;
        }

        ArtistDto artistDto = new ArtistDto();

        artistDto.setArtistId( artist.getArtistId() );
        artistDto.setArtistName( artist.getArtistName() );
        artistDto.setLocation( artist.getLocation() );
        artistDto.setActivePeriod( artist.getActivePeriod() );
        artistDto.setPerson( artist.isPerson() );

        return artistDto;
    }

    protected SongDto songToSongDto(Song song) {
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

    protected List<SongDto> songListToSongDtoList(List<Song> list) {
        if ( list == null ) {
            return null;
        }

        List<SongDto> list1 = new ArrayList<SongDto>( list.size() );
        for ( Song song : list ) {
            list1.add( songToSongDto( song ) );
        }

        return list1;
    }
}
