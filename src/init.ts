import fs from 'fs';
import run from 'nslibmgr/lib/run';

import config from './config';
import { Manager } from './manager';

export async function init () {
	if (!fs.existsSync(config.str.TMPFS_PATH)) {
		await fs.promises.mkdir(config.str.TMPFS_PATH);
	}
	await run(`umount ${config.str.TMPFS_PATH}`);
	await run(`mount -t tmpfs -o size=${config.str.TMPFS_SIZE} ramdisk ${config.str.TMPFS_PATH}`);
	await fs.promises.chown(config.str.TMPFS_PATH, config.num.UID, config.num.GID);
	process.setgid(config.num.GID);
	process.setuid(config.num.UID);
	const manager = new Manager(config);
	return manager;
}
