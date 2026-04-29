CREATE OR REPLACE FUNCTION search_clinics(
  p_query TEXT DEFAULT '',
  p_location_city TEXT DEFAULT ''
) RETURNS SETOF clinics AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM clinics
  WHERE (p_query = '' OR name ILIKE '%' || p_query || '%' OR city ILIKE '%' || p_query || '%')
  ORDER BY
    CASE 
      WHEN p_location_city != '' AND city ILIKE p_location_city THEN 0 
      ELSE 1 
    END,
    name ASC;
END;
$$ LANGUAGE plpgsql;
