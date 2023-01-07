-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER mindful_owner
WITH PASSWORD 'mindful';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO mindful_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO mindful_owner;

CREATE USER mindful_appuser
WITH PASSWORD 'mindful';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO mindful_appuser;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO mindful_appuser;
