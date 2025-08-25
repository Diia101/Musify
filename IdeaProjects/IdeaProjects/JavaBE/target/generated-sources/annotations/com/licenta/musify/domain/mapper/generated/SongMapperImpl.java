package com.licenta.musify.domain.mapper.generated;

import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.domain.dto.ArtistSongDto;
import com.licenta.musify.domain.dto.SongArtistDto;
import com.licenta.musify.domain.dto.SongCreateDto;
import com.licenta.musify.domain.dto.SongDto;
import com.licenta.musify.domain.mapper.SongMapper;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import com.licenta.musify.domain.model.Song.SongBuilder;
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
public class SongMapperImpl implements SongMapper {

    private final DatatypeFactory datatypeFactory;

    public SongMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public SongDto toViewDto(Song song) {
        if ( song == null ) {
            return null;
        }

        String creation_date = null;
        Integer id = null;
        String title = null;
        String alternative_title = null;
        Integer duration = null;
        String url = null;

        creation_date = xmlGregorianCalendarToString( dateToXmlGregorianCalendar( song.getCreation_date() ), "yyyy-MM-dd" );
        id = song.getId();
        title = song.getTitle();
        alternative_title = song.getAlternative_title();
        duration = song.getDuration();
        url = song.getUrl();

        SongDto songDto = new SongDto( id, title, alternative_title, duration, creation_date, url );

        return songDto;
    }

    @Override
    public Song toEntity(SongCreateDto songCreateDto) {
        if ( songCreateDto == null ) {
            return null;
        }

        SongBuilder song = Song.builder();

        song.title( songCreateDto.getTitle() );
        song.alternative_title( songCreateDto.getAlternative_title() );
        song.duration( songCreateDto.getDuration() );
        song.creation_date( songCreateDto.getCreation_date() );
        song.url( songCreateDto.getUrl() );

        return song.build();
    }

    @Override
    public List<SongDto> toListViewDto(List<Song> songList) {
        if ( songList == null ) {
            return null;
        }

        List<SongDto> list = new ArrayList<SongDto>( songList.size() );
        for ( Song song : songList ) {
            list.add( toViewDto( song ) );
        }

        return list;
    }

    @Override
    public List<ArtistSongDto> toListViewArtistSong(List<Artist> list) {
        if ( list == null ) {
            return null;
        }

        List<ArtistSongDto> list1 = new ArrayList<ArtistSongDto>( list.size() );
        for ( Artist artist : list ) {
            list1.add( artistToArtistSongDto( artist ) );
        }

        return list1;
    }

    @Override
    public List<SongArtistDto> toListViewSongArtist(List<Song> list) {
        if ( list == null ) {
            return null;
        }

        List<SongArtistDto> list1 = new ArrayList<SongArtistDto>( list.size() );
        for ( Song song : list ) {
            list1.add( songToSongArtistDto( song ) );
        }

        return list1;
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

    protected Set<SongDto> songSetToSongDtoSet(Set<Song> set) {
        if ( set == null ) {
            return null;
        }

        Set<SongDto> set1 = new HashSet<SongDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Song song : set ) {
            set1.add( toViewDto( song ) );
        }

        return set1;
    }

    protected ArtistSongDto artistToArtistSongDto(Artist artist) {
        if ( artist == null ) {
            return null;
        }

        ArtistSongDto artistSongDto = new ArtistSongDto();

        artistSongDto.setArtistId( artist.getArtistId() );
        artistSongDto.setArtistName( artist.getArtistName() );
        artistSongDto.setLocation( artist.getLocation() );
        artistSongDto.setActivePeriod( artist.getActivePeriod() );
        artistSongDto.setPerson( artist.isPerson() );
        artistSongDto.setSongsOfAnArtist( songSetToSongDtoSet( artist.getSongsOfAnArtist() ) );

        return artistSongDto;
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

    protected Set<ArtistDto> artistSetToArtistDtoSet(Set<Artist> set) {
        if ( set == null ) {
            return null;
        }

        Set<ArtistDto> set1 = new HashSet<ArtistDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Artist artist : set ) {
            set1.add( artistToArtistDto( artist ) );
        }

        return set1;
    }

    protected SongArtistDto songToSongArtistDto(Song song) {
        if ( song == null ) {
            return null;
        }

        SongArtistDto songArtistDto = new SongArtistDto();

        songArtistDto.setId( song.getId() );
        songArtistDto.setTitle( song.getTitle() );
        songArtistDto.setAlternative_title( song.getAlternative_title() );
        songArtistDto.setDuration( song.getDuration() );
        songArtistDto.setCreation_date( song.getCreation_date() );
        songArtistDto.setUrl( song.getUrl() );
        songArtistDto.setArtistsOfASong( artistSetToArtistDtoSet( song.getArtistsOfASong() ) );

        return songArtistDto;
    }
}
