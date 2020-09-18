# CS2102_2021_S1_Team49

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
