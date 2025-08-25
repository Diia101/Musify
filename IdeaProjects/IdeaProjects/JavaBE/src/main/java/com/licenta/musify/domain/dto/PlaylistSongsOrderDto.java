package com.licenta.musify.domain.dto;

import com.licenta.musify.constant.ChangeSongOrderType;
import lombok.Data;

@Data
public class PlaylistSongsOrderDto {
    private Integer oldIndex;
    private Integer newIndex;
    private ChangeSongOrderType changeType;
}
