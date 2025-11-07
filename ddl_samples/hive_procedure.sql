-- Simulated stored procedure for demonstration
CREATE PROCEDURE update_customer_status()
BEGIN
  INSERT OVERWRITE TABLE analytics.customer_status
  SELECT customer_id,
         CASE WHEN max(order_date) > date_sub(current_date, 30) THEN 'ACTIVE' ELSE 'INACTIVE' END AS status
  FROM sales.orders
  GROUP BY customer_id;
END;
