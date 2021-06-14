import { listen } from 'nodesite.eu-local';

import config from './config';

export const { server, create } = listen({
	name: config.str.NODESITE_NAME,
	port: config.num.HTTP_PORT,
	interface: 'http',
});

export default server;
module.exports = server;

Object.assign(server, {
	default: server,
	server,
	create,
});
