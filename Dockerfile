FROM node:26-alpine AS deps
WORKDIR /opt/app
RUN npm i -g pnpm@12.6.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM node:26-alpine AS build
WORKDIR /opt/app
RUN npm i -g pnpm@12.6.0
COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm run build && pnpm prune --prod

FROM node:26-alpine AS runner
WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=build /opt/app ./
EXPOSE 3000
CMD ["npm", "start"]
