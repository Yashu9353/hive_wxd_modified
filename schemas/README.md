# Sample Schema Files

This folder contains sample schema files that you can use to test the "Upload schemas" functionality in the Data Modernization Process.

## Available Files

1. **sample_schemas.txt** - Simple text file with one schema name per line
   - Format: Plain text, one schema per line
   - Contains: default, sales, analytics

2. **sample_schemas.csv** - CSV file with schema names
   - Format: CSV with header row
   - First column contains schema names
   - Contains: default, sales, analytics

3. **sample_schemas.json** - JSON array format
   - Format: JSON array of strings
   - Contains: ["default", "sales", "analytics"]

4. **sample_schemas_object.json** - JSON object format
   - Format: JSON object with "schemas" property
   - Contains: Object with schemas array

## How to Use

1. Navigate to the Data Modernization Process page
2. Go to Step 2: Select schemas
3. Click "Upload schemas" button
4. Select one of these sample files
5. The schemas will be automatically parsed and loaded

## File Format Requirements

- **Text files (.txt)**: One schema name per line
- **CSV files (.csv)**: First column should contain schema names
- **JSON files (.json)**: 
  - Array format: `["schema1", "schema2"]`
  - Object format: `{"schemas": ["schema1", "schema2"]}`

