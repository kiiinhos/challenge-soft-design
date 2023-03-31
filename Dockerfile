ARG USER=node
ARG APP_HOME=/home/${USER}/app
ARG PORT=3000
FROM node:16-alpine As base
ARG APP_HOME
WORKDIR ${APP_HOME}
COPY . ${APP_HOME}
RUN npm install \
    && npm cache clean --force
RUN npm run build
FROM node:16-alpine
ARG USER
ARG APP_HOME
ARG PORT
ENV NODE_PATH=.
WORKDIR ${APP_HOME}
COPY --chown=${USER}:${USER} --from=base ${APP_HOME} ${APP_HOME}
RUN ls -l
USER ${USER}
EXPOSE ${PORT}
CMD [ "node", "dist/main.js" ]