# PostgreSQL Database

This folder contains the database schema and seed data for the Archery Score Recorder, designed for use with a PostgreSQL database.

## Cloud Database

This app is currently running on [Neon](https://neon.tech), a serverless PostgreSQL cloud platform. The connection is managed via the `@neondatabase/serverless` driver in `lib/db.ts`.

## Folder Structure

```
postgresql/
  01-schema.sql      ← table definitions (run first)
  02...seed.sql        ← sample data for development and testing
```

## Setup

### 1. Run the schema

Execute `schema.sql` in your PostgreSQL database to create all tables and constraints:

Or paste the contents directly into the Neon SQL editor.

### 2. Run the seed data

Execute `seed.sql` to populate the lookup tables and sample data