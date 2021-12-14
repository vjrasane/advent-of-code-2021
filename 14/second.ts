
import { identity, countBy, min, max, first, tail, times, values, flow } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const template = first(input)?.split("") || [];

const rules = tail(input).map((line) => {
	const [pair, result] = line.split(" -> ");
	return [pair, result] as const;
});

const elements = countBy(identity, template);
const pairs = countBy(identity, template.reduce(
	(acc: string[], curr, index): string[] => {
	if (index === template.length - 1) return acc;
	const pair = [curr, template[index + 1]].join("");
	return [...acc, pair];
	}, []));

const modify = (key: string, num: number) => (obj: Record<string, number>) => ({
	...obj,
	[key]: (obj[key] ?? 0) + num
})

const applyRules = (elements: Record<string, number>, pairs: Record<string, number>): [Record<string, number>, Record<string, number>] => {
	return rules.reduce(
		(
			[elems, ps]: [Record<string, number>, Record<string, number>], 
			[pair, result]): [Record<string, number>, Record<string, number>] => {
			const pairCount = pairs[pair];
			if (!pairCount) return [elems, ps];
			const [a, b] = pair.split("");	
			return [
				{ ...elems, [result]: (elems[result] ?? 0) + pairCount },
				flow(
					modify(pair, -pairCount),
					modify([a, result].join(""),  pairCount),
					modify([result, b].join(""), pairCount),
				)(ps)
			]
		},
		 [elements, pairs])
}

const [results] = times(identity, 40).reduce(
	([elements, pairs]) => { return applyRules(elements, pairs); }, [elements, pairs]
)
const counts = values(results);
console.log(max(counts) as number - (min(counts) as number))