# CS2102_2021_S1_Team49

## Tech Stack Used

**Frontend**: React

**Backend**: Node + Express.js

**API**: gRPC

**DB**: PostgresSQL

## Project Setup

### Step 1: Local Git Setup

1. Install Git.
2. Fork this repo and clone to local
3. Add a remote name (e.g. `upstream`) for your copy of the main repo.
Fetch the remote-tracking branches from the main repo to keep it in sync with your copy.
```
git remote add upstream https://github.com/moziliar/CS2102_2021_S1_Team49
git fetch upstream
```
Verify with `git branch -r` (should see `upstream/master`)
4. Set your `master` branch to track the main repo's `master` branch
```
git checkout master
git branch -u upstream/master
```
> Future PR make directly to the `upstream master`. Constantly pull from `upstream master`.

### DB Setup

#### Local Setup: Docker Compose

We recommend using Docker compose as it provides a standardized, production-ready environment for the DB server.

If you choose to install DB server locally, feel free to do so.

1. Install Docker
    * Mac: https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe
    * Linux: https://hub.docker.com/search?q=&type=edition&offering=community&operating_system=linux
2. Use the Docker Compose file with `docker-compose up -d` where `-d` flag starts the composed containers in the 
background.
3. Refer to the output log (`docker-compose logs -f`) for DB password if unsure.
4. Use `docker ps` to get the container ID
5. Use `docker exec -ti [postgres container id] psql -U [username]` to enter the PostgreSQL server in the container.
 
