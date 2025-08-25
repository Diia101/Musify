package com.licenta.musify.controller;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.AlbumsCreateDto;
import com.licenta.musify.service.AlbumService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AlbumController {

    private final AlbumService albumService;

    @GetMapping("/{id}")
    public AlbumDto getAlbumById(@PathVariable Integer id) {
        return albumService.getAlbumById(id);
    }

    @PostMapping
    public void createAlbum(@RequestBody AlbumsCreateDto albumCreateDto) {
        albumService.createAlbum(albumCreateDto);
    }

    @GetMapping("/search")
    List<AlbumDto> getAlbumsByName(@RequestParam(required = false) String albumName) {
        return albumService.searchByName(albumName);
    }
    @GetMapping
    public List<AlbumDto> getAlbums() {
        return albumService.getAlbums();
    }

    @PutMapping("/{id}")
    public AlbumDto updateAlbum(@PathVariable Integer id, @RequestBody AlbumsCreateDto albumCreateDto) {
        return albumService.updateAlbum(id, albumCreateDto);
    }

    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Integer id) {
        albumService.deleteAlbum(id);
    }

    @PostMapping("/{albumId}/{songId}/songs")
    public ResponseEntity<AlbumDto> addSongsToAlbum(@PathVariable Integer albumId, @PathVariable Integer songId) {
        AlbumDto albumDto = albumService.addSongsToAlbum(albumId, songId);
        return ResponseEntity.ok(albumDto);

    }

    @GetMapping("/{albumId}/songs")
    public ResponseEntity<List<String>> getSongsByAlbumId(@PathVariable Integer albumId) {
        List<String> songTitles = albumService.getSongsByAlbumId(albumId);
        return ResponseEntity.ok(songTitles);
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<AlbumDto>> getAlbumsByGenre(@PathVariable String genre) {
        List<AlbumDto> albums = albumService.getAlbumsByGenre(genre);
        return ResponseEntity.ok(albums);
    }

}
