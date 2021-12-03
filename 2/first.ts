import fs from "fs";
import { basename, join } from "path";

const input = fs.readFileSync(
	join(__dirname, basename(__filename, '.ts') + ".input"),
	"utf-8"
).replace('\r\n', '\n').split("\n");

const commands = input.map(
	(input): [string, number] => {
		const [command, num]	= input.split(" ");
		return [command, parseInt(num, 10)]
	}
);

const [horizontal, depth] = commands.reduce(
	([horizontal, depth], [command, amount]) => {
	switch(command) {
		case "forward":
			return [horizontal + amount, depth];
		case "down":
			return [horizontal, depth + amount];
		case "up":
			return [horizontal, depth - amount];
		default:
			return [horizontal, depth];
	}
}, [0,0])

console.log(horizontal * depth)