# use the official Bun image see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine AS base

WORKDIR /usr/src/app

FROM base AS install
RUN apk update && apk add --no-cache git && rm -rf /var/cache/apk/*

# run the app

# install dev version with devDependencies
RUN mkdir -p /temp/dev
COPY package.json bun.lockb lefthook.yml .husky /temp/dev/
RUN cd /temp/dev && git init && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb lefthook.yml .husky /temp/prod/
RUN cd /temp/prod && git init && bun install --frozen-lockfile --production

# copy node_modules from temp directory then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release

USER bun
EXPOSE 3000/tcp

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/.next .next
COPY --from=prerelease /usr/src/app/next.config.js .
COPY --from=prerelease /usr/src/app/package.json .

CMD ["bun", "start"]
