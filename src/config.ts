import { getConfig } from 'doge-config';
import path from 'path';

const config = getConfig('packager-server', {
	NODESITE_NAME: 'pkg',
	HTTP_PORT: 80,
	TMPFS_PATH: path.resolve('.', 'tmpfs'),
	TMPFS_SIZE: '1g',
	UID: 1000,
	GID: 1000,
});

export default config;
module.exports = config;

Object.assign(config, {
	default: config,
	config,
});
