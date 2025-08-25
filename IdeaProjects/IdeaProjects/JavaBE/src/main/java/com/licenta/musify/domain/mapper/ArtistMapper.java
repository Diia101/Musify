package com.licenta.musify.domain.mapper;

import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.User;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = UserMapper.class)

public abstract class ArtistMapper {

    public abstract ArtistDto toViewDto(Artist artist);

    @AfterMapping
    public void setListOfUsers(@MappingTarget ArtistDto artistDto, Artist artist){
        if(artist.getUserList() != null) {
            List<UserDto> userDtos = artist.getUserList().stream().map(this::toUserDto).toList();
            artistDto.setArtists(userDtos);
        }else{
            artist.setUserList(new ArrayList<>());
        }
    }

    public abstract UserDto toUserDto(User user);

    @Mapping(source = "person", target = "isPerson")
    public abstract Artist toEntity(ArtistCreateDto artistCreateDto);

    public abstract List<ArtistDto> toListView(List<Artist> artists);

}
