drop trigger if exists modify_artist_trigger on artists_users;

drop trigger if exists after_user_update on users;

CREATE OR REPLACE FUNCTION combined_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    artist RECORD;
    user_count INT;
BEGIN
	DELETE FROM artists_users WHERE user_id = OLD.user_id;

    FOR artist IN
        SELECT artist_id
        FROM artists
    LOOP
        SELECT COUNT(user_id) INTO user_count
        FROM artists_users
        WHERE artist_id = artist.artist_id;

        IF user_count > 1 THEN
            UPDATE artists
            SET is_person = false
            WHERE artist_id = artist.artist_id;
        ELSIF user_count = 1 THEN
            UPDATE artists
            SET is_person = true
            WHERE artist_id = artist.artist_id;
        ELSIF user_count = 0 THEN
            DELETE FROM artists
            WHERE artist_id = artist.artist_id;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


drop trigger if exists after_user_update ON users;

CREATE TRIGGER after_user_update
AFTER UPDATE OF is_active ON users
FOR EACH ROW
WHEN (OLD.is_active IS DISTINCT FROM NEW.is_active)
EXECUTE FUNCTION combined_trigger_function();