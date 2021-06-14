import run from 'nslibmgr/lib/run';
import { Manager } from "./manager";

export class Packager {
	manager: Manager;
	private __working = false;
	private __wake: () => void = () => {}
	constructor (manager: Manager) {
		this.manager = manager;
		setTimeout(() => this.work());
	}
	get working (): boolean {
		return this.__working;
	}
	wake (): void {
		const wake = this.__wake;
		this.__wake = () => {}
		return wake();
	}
	async work () {
		while (true) {
			try {
				const task = this.manager.queue.next;
				if (!task) {
					await new Promise (resolve => {
						this.__wake = () => resolve(true);
					});
				} else {
					if (await run(`cd ${this.manager.config.str.TMPFS_PATH}; echo "console.log(process.cwd())" | node; npm init -y; yarn add ${task}; pkg -C Gzip node_modules/.bin/${task}; cd ..`)) {
						await run(`cd tmpfs; mv ${task}-linux ${task}.elf; mv ${task}-macos ${task}.app; mv ${task}-win.exe ${task}.exe; cd ..`);
						this.manager.queue.finish(task);
					} else {
						this.manager.queue.tasks.delete(task);
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
}
