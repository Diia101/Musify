package com.licenta.musify.controller;

import com.licenta.musify.domain.dto.*;
import com.licenta.musify.service.SongService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/songs")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class SongController {

    private final SongService songService;

    @GetMapping
    public List<SongDto> getSongs() {
        return songService.getSongs();
    }

    @GetMapping("/{id}")
    public SongDto getSongById(@PathVariable Long id) {
        return songService.getSongById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createSong(@RequestBody SongCreateDto songCreateDto) {
        songService.create(songCreateDto);
    }

    @PutMapping("/{id}")
    public SongDto updateSong(@PathVariable Long id, @RequestBody SongUpdateDto songUpdateDto) {
        return songService.updateSong(id, songUpdateDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSong(@PathVariable Long id) {
        songService.deleteSong(id);
    }

    @GetMapping("/bySongTitle")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ArtistSongDto>> searchSongsByTitle(@RequestParam String searchSongTitle) {
        return ResponseEntity.ok(songService.searchSongByTitle(searchSongTitle));
    }

    @GetMapping("/bySongName")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<SongArtistDto>> searchSongsByName(@RequestParam(required = false) String searchSongTitle) {
        return ResponseEntity.ok(songService.searchByName(searchSongTitle));
    }

    @GetMapping("/byArtistName")
    public ResponseEntity<List<SongArtistDto>> searchSongsOfArtist(@RequestParam String artistName) {
        return ResponseEntity.ok(songService.searchByArtistName(artistName));
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<List<SongArtistDto>> songOfAnArtistByID(@PathVariable Integer artistId) {
        return ResponseEntity.ok(songService.getSongsByArtistId(artistId));
    }

    @GetMapping("/artist/{artistId}/Album")
    public ResponseEntity<List<SongDto>> availableSongsForArtistAlbum(@PathVariable Integer artistId) {
        return ResponseEntity.ok(songService.getAvailableSongsForArtistAlbum(artistId));
    }
}
