import { ConfigField } from 'doge-config';
import { Packager } from './packager';
import Queue from './queue';
import { create, server } from './server';

export class Manager {
	constructor (config: ConfigField) {
		this.config = config;
		this.create = create;
		this.server = server;
		create('/', (request) => (
			this.queue.tasks.size
			? JSON.stringify({
				error: 'Please wait, not ready yet!',
			})
			: JSON.stringify({
				error: 'Package not found!',
				try: '/get/PACKAGE_NAME',
			})
		), config.str.TMPFS_PATH);
		create('/get', (request) => {
			const pkg = request.uri.split(/[^a-z0-9\-]+/gi).filter(a => (
				   ( a !== 'get' )
				&& ( a !== 'exe ')
				&& ( a !== 'app ')
				&& ( a !== 'elf' )
			)).pop();
			if (!pkg) return `Invalid package: ${pkg}`;
			this.queue.add(pkg);
			this.packager.wake();
			return JSON.stringify({
				windows: `${config.str.REAL_HOST}/get/${pkg}.exe`,
				macos: `${config.str.REAL_HOST}/get/${pkg}.app`,
				linux: `${config.str.REAL_HOST}/get/${pkg}.elf`,
			});
		}, config.str.TMPFS_PATH);
	}
	config: ConfigField;
	create: typeof create;
	server: typeof server;
	packager = new Packager(this);
	queue = new Queue<string>();
}
