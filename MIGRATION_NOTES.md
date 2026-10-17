# Migration summary - Quality Assurance Engineering

The old Express/Node backend source has been replaced with Laravel 13 code. The client-side applications remain JavaScript/React or Flutter because Laravel does not replace browser or mobile code. API endpoints, tests and data access are now implemented in PHP controllers, Laravel routes, migrations and seeders.

See `api/README.md` for setup. **Composer vendor packages are not bundled; a full runtime test requires `composer install`.**

Previous README text and generated PDFs referencing Express or port 4000 are superseded by this guide and the revised Laravel course materials.
