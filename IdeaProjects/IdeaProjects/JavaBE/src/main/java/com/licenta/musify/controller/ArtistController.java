package com.licenta.musify.controller;

import com.licenta.musify.domain.dto.AlbumDto;
import com.licenta.musify.domain.dto.ArtistCreateDto;
import com.licenta.musify.domain.dto.ArtistDto;
import com.licenta.musify.service.ArtistService;
import com.licenta.musify.utils.BindingResultChecker;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping
    public List<ArtistDto> getArtists() {
        return artistService.getArtists();
    }

    @GetMapping("/{id}")
    public ArtistDto getArtistById(@PathVariable Integer id) {
        return artistService.getArtistById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createArtist(@Valid @RequestBody ArtistCreateDto artistCreateDto, BindingResult bindingResult) {
        BindingResultChecker.checkErrors(bindingResult);
        artistService.createArtist(artistCreateDto);
    }

    @PutMapping("/{id}")
    public ArtistDto updateArtist(@PathVariable Integer id, @Valid @RequestBody ArtistCreateDto artistCreateDto, BindingResult bindingResult) {
        BindingResultChecker.checkErrors(bindingResult);
        return artistService.updateArtist(id, artistCreateDto);
    }

    @GetMapping("/search")
    public List<ArtistDto> searchArtist(@RequestParam(required = false) String searchName) {
        return artistService.searchArtistByName(searchName);
    }

    @GetMapping("/{artistId}/albums")
    public ResponseEntity<List<AlbumDto>> getAlbumsByArtistId(@PathVariable Integer artistId) {
        List<AlbumDto> albums = artistService.getAlbumsByArtistId(artistId);
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/user")
    public ArtistDto getByUserId() {
        return artistService.getByUserId();
    }


    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public void deleteArtist(@PathVariable Integer id) {
        artistService.deleteArtist(id);
    }
}
