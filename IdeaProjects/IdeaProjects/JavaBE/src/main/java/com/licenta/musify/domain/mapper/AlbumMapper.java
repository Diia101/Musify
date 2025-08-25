package com.licenta.musify.domain.mapper;


import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.model.Album;
import com.licenta.musify.domain.model.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class AlbumMapper {

    @Mapping(source = "artist", target = "artist")
    @Mapping(target = "releaseDate", source = "releaseDate", dateFormat = "yyyy-MM-dd")
    public abstract AlbumDto toViewDto(Album album);

    @AfterMapping
    public void setListOfUsers(@MappingTarget AlbumDto albumDto, Album album){
        List<UserDto> userDtos = album.getArtist().getUserList().stream().map(this::toUserDto).toList();
        albumDto.getArtist().setArtists(userDtos);
    }

    public abstract UserDto toUserDto(User user);

    public abstract Album toEntity(AlbumsCreateDto albumCreateDto);

    public abstract List<AlbumDto> toListViewDto(List<Album> albumList);

}
