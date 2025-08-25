package com.licenta.musify.domain.mapper.generated;

import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.mapper.ArtistMapper;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Artist.ArtistBuilder;
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
public class ArtistMapperImpl extends ArtistMapper {

    private final DatatypeFactory datatypeFactory;

    public ArtistMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public ArtistDto toViewDto(Artist artist) {
        if ( artist == null ) {
            return null;
        }

        ArtistDto artistDto = new ArtistDto();

        artistDto.setArtistId( artist.getArtistId() );
        artistDto.setArtistName( artist.getArtistName() );
        artistDto.setLocation( artist.getLocation() );
        artistDto.setActivePeriod( artist.getActivePeriod() );
        artistDto.setPerson( artist.isPerson() );

        setListOfUsers( artistDto, artist );

        return artistDto;
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
    public Artist toEntity(ArtistCreateDto artistCreateDto) {
        if ( artistCreateDto == null ) {
            return null;
        }

        ArtistBuilder artist = Artist.builder();

        artist.isPerson( artistCreateDto.isPerson() );
        artist.artistName( artistCreateDto.getArtistName() );
        artist.location( artistCreateDto.getLocation() );
        artist.activePeriod( artistCreateDto.getActivePeriod() );

        return artist.build();
    }

    @Override
    public List<ArtistDto> toListView(List<Artist> artists) {
        if ( artists == null ) {
            return null;
        }

        List<ArtistDto> list = new ArrayList<ArtistDto>( artists.size() );
        for ( Artist artist : artists ) {
            list.add( toViewDto( artist ) );
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
}
