export class Queue<T> {
	complete = new Set<T>();
	tasks = new Set<T>();
	current_task?: T;
	add (...tasks: T[]) {
		for (const task of tasks) {
			this.tasks.add(task);
		}
	}
	finish (task: T) {
		this.complete.add(task);
		this.tasks.delete(task);
		if (this.current_task === task) {
			this.current_task = undefined;
		}
	}
	get current (): T | undefined {
		return this.current_task;
	}
	get next (): T | undefined {
		for (const task of this.tasks) {
			if (this.current_task !== task) {
				return this.current_task = task;
			}
		}
	}
}

export default Queue;
module.exports = Queue;

Object.assign(Queue, {
	default: Queue,
	Queue,
});
