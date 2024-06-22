# Setup

1. Install yarn (package manager) if you don't have it already: `npm install --global yarn`
2. Copy the `.env` variables into the root directory of this project
3. Install Docker Desktop and run `docker compose up` in a separate terminal
4. Install all the dependencies using `yarn`
5. Run `yarn prisma migrate dev` to update the database changes to your local Postgres database running in Docker
6. Run `yarn dev` and visit localhost to see if the website works