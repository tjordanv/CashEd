-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER finapp_owner
WITH PASSWORD 'password';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO finapp_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO finapp_owner;

CREATE USER finapp_appuser
WITH PASSWORD 'password';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO finapp_appuser;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO finapp_appuser;
