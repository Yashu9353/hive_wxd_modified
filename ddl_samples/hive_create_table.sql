CREATE TABLE IF NOT EXISTS sales.orders (
  order_id BIGINT,
  order_date TIMESTAMP,
  customer_id BIGINT,
  order_total DECIMAL(12,2),
  status STRING
)
PARTITIONED BY (order_year INT, order_month INT)
STORED AS PARQUET
LOCATION 's3://hive-data/sales/orders/';
