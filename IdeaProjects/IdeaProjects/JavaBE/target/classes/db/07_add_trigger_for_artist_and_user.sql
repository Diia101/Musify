CREATE OR REPLACE FUNCTION delete_artist_users()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM artists_users WHERE user_id = OLD.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_update
AFTER UPDATE OF is_active ON users
FOR EACH ROW
WHEN (OLD.is_active IS DISTINCT FROM NEW.is_active)
EXECUTE FUNCTION delete_artist_users();

CREATE OR REPLACE FUNCTION modify_artist()
RETURNS TRIGGER AS $$
DECLARE
    user_count INT;
BEGIN
    SELECT COUNT(user_id) INTO user_count
    FROM artists_users
    WHERE artist_id = OLD.artist_id;

    IF user_count > 1 THEN
        UPDATE artists
        SET is_person = false
        WHERE artist_id = OLD.artist_id;
    ELSIF user_count = 1 THEN
        UPDATE artists
        SET is_person = true
        WHERE artist_id = OLD.artist_id;
    ELSIF user_count = 0 THEN
        DELETE FROM artists
        WHERE artist_id = OLD.artist_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER modify_artist_trigger
AFTER INSERT OR UPDATE OR DELETE ON artists_users
FOR EACH ROW
EXECUTE FUNCTION modify_artist();