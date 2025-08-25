
CREATE OR REPLACE FUNCTION after_update_playlist()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_public = false THEN
        DELETE FROM USERS_PLAYLISTS
        WHERE playlist_id = NEW.playlist_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_update_playlist
AFTER UPDATE ON PLAYLISTS
FOR EACH ROW
WHEN (OLD.is_public IS DISTINCT FROM NEW.is_public)
EXECUTE FUNCTION after_update_playlist();