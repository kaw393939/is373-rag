ARG NODE_IMAGE
ARG WEB_IMAGE
FROM ${NODE_IMAGE} AS build
WORKDIR /source
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY scripts ./scripts
COPY src ./src
RUN npm test

FROM ${WEB_IMAGE}
ARG SOURCE_REVISION=unknown
LABEL org.opencontainers.image.title="Ordo Knowledge Lab welcome" \
      org.opencontainers.image.source="https://github.com/kaw393939/is373-rag" \
      org.opencontainers.image.revision="${SOURCE_REVISION}" \
      org.opencontainers.image.description="Static Svelte welcome preview; research backend not connected."
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /source/build /usr/share/nginx/html
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O - http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
