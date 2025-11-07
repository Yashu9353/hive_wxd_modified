GRANT SELECT ON TABLE sales.orders TO ROLE analyst;
GRANT INSERT ON TABLE sales.orders TO ROLE loader;
GRANT ALL ON DATABASE sales TO USER 'migration_admin';
REVOKE SELECT ON TABLE sales.orders FROM ROLE guest;
