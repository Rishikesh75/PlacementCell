# PlacementCell API documentation

This directory contains the OpenAPI document and the static Swagger UI page published by GitHub Actions.

## Public documentation

After the workflow is merged into `main` and its deployment succeeds, the documentation will be available at:

`https://rishikesh75.github.io/PlacementCell/`

## How publishing works

The workflow at `.github/workflows/swagger-docs.yml`:

1. Builds the Spring Boot backend with Java 17 and Maven.
2. Validates the checked-in `openapi.json`.
3. Packages `index.html` and `openapi.json` as a static GitHub Pages site.
4. Deploys the site when changes reach `main`.

No application startup, PostgreSQL, MongoDB, production credentials, or other database services are used by this workflow.

## Keeping the API specification current

The checked-in `openapi.json` is the source consumed by Swagger UI. The current workflow validates and publishes that file; it does **not** regenerate it from Java source. Springdoc normally exposes the live specification at `/v3/api-docs` when the Spring Boot application is running. Refresh this file from that endpoint whenever API routes or request/response models change, then commit the updated JSON.

## Try it out

Swagger UI can display the API contract without a running backend. The **Try it out** feature requires a reachable backend server and appropriate CORS configuration. The GitHub Pages site itself does not host the API.
