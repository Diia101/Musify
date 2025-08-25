package com.licenta.musify.domain.model;

import java.util.Comparator;

public class PlaylistSongComparator implements Comparator<PlaylistsSongs> {
    @Override
    public int compare(PlaylistsSongs o1, PlaylistsSongs o2) {
        return o1.getPositionInPlaylist() - o2.getPositionInPlaylist();
    }
}
