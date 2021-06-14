import { getConfig } from 'doge-config';
import path from 'path';

const config = getConfig('packager-server', {
	/**
	 * Externally accessable URI root
	 */
	REAL_HOST: 'http://localhost',
	/**
	 * Passed to nodesite.eu
	 */
	NODESITE_NAME: 'pkg',
	/**
	 * For local listener
	 */
	HTTP_PORT: 80,
	/**
	 * Where to mount tmpfs
	 */
	TMPFS_PATH: path.resolve('.', 'tmpfs'),
	/**
	 * tmpfs size
	 */
	TMPFS_SIZE: '1g',
	/**
	 * UID and GID to lower privileges to
	 * Set to 0 to run as root
	 */
	UID: process.getuid() || 1000,
	GID: process.getgid() || 1000,
});

export default config;
module.exports = config;

Object.assign(config, {
	default: config,
	config,
});
