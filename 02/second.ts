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
	([horizontal, depth, aim], [command, amount]) => {
	switch(command) {
		case "down":
			return [horizontal, depth, aim + amount];
		case "up":
			return [horizontal, depth, aim - amount];
		case "forward":
			return [horizontal + amount, depth + aim * amount, aim];
		default:
			return [horizontal, depth, aim];
	}
}, [0,0,0])

console.log(horizontal * depth)