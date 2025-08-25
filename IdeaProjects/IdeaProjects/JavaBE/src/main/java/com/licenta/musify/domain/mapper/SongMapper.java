package com.licenta.musify.domain.mapper;

import com.licenta.musify.domain.dto.ArtistSongDto;
import com.licenta.musify.domain.dto.SongArtistDto;
import com.licenta.musify.domain.dto.SongCreateDto;
import com.licenta.musify.domain.dto.SongDto;
import com.licenta.musify.domain.model.Artist;
import com.licenta.musify.domain.model.Song;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SongMapper {

    @Mapping(target = "creation_date", source = "creation_date", dateFormat = "yyyy-MM-dd")
    SongDto toViewDto(Song song);

    Song toEntity(SongCreateDto songCreateDto);

    List<SongDto> toListViewDto(List<Song> songList);

    List<ArtistSongDto> toListViewArtistSong(List<Artist> list);

    List<SongArtistDto> toListViewSongArtist(List<Song> list);


}
