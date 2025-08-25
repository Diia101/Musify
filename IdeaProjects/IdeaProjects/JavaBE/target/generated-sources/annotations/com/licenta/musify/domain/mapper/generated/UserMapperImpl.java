package com.licenta.musify.domain.mapper.generated;

import com.licenta.musify.constant.Roles;
import com.licenta.musify.domain.dto.UserCreateDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.dto.UserUpdateDto;
import com.licenta.musify.domain.mapper.UserMapper;
import com.licenta.musify.domain.model.User;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
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
public class UserMapperImpl implements UserMapper {

    private final DatatypeFactory datatypeFactory;

    public UserMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public User toEntity(UserCreateDto userCreateDto) {
        if ( userCreateDto == null ) {
            return null;
        }

        User user = new User();

        user.setFirstname( userCreateDto.getFirstname() );
        user.setLastname( userCreateDto.getLastname() );
        user.setEmail( userCreateDto.getEmail() );
        user.setUserPassword( userCreateDto.getUserPassword() );
        user.setCountry( userCreateDto.getCountry() );
        user.setBirthday( userCreateDto.getBirthday() );

        user.setIsActive( true );
        user.setUserType( Roles.REGULAR );

        return user;
    }

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setBirthday( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( user.getBirthday() ), "yyyy-MM-dd" ) );
        userDto.setUserId( user.getUserId() );
        userDto.setFirstname( user.getFirstname() );
        userDto.setLastname( user.getLastname() );
        userDto.setEmail( user.getEmail() );
        userDto.setUserPassword( user.getUserPassword() );
        userDto.setCountry( user.getCountry() );

        return userDto;
    }

    @Override
    public UserUpdateDto toUpdateViewDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserUpdateDto userUpdateDto = new UserUpdateDto();

        userUpdateDto.setFirstname( user.getFirstname() );
        userUpdateDto.setLastname( user.getLastname() );
        userUpdateDto.setCountry( user.getCountry() );

        return userUpdateDto;
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
