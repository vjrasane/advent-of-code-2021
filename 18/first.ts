

import { get, isEqual, set } from "lodash/fp";
import { getInputFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const nums = input.map((line) => JSON.parse(line)) as Array<Tree>;

type Tree = number | [Tree, Tree];

const getNode = (root: Tree, path: Array<0 | 1>) => path.length ? get(path, root) : root;

const setNode = (root: Tree, node: Tree, path: Array<0 | 1>) => path.length ? set(path, node, root as [Tree, Tree]) : root

const updateNode = (root: Tree, updater: (node: Tree) => Tree, path: Array<0 | 1>) => setNode(root, updater(getNode(root, path)), path);

const addToSibling = (num: number, node: Tree, side: 0 | 1): Tree => {
	if (!Array.isArray(node)) return node + num;
	return node.map(
		(child, index) => index === side ? addToSibling(num, child, side) : child
	) as [Tree, Tree];
}

const split = (root: Tree, path: Array<0 | 1> = []): Tree => {
	const current: Tree = getNode(root, path);
	if (Array.isArray(current)) {
		const res = split(root, [...path, 0]);
		if (!isEqual(res, root)) return res;
		return split(root, [...path, 1]);
	}
	return current >= 10 ?
		setNode(root, [Math.floor(current / 2), Math.ceil(current / 2)], path) : root;
}

const explode = (root: Tree, path: Array<0 | 1> = [], leftPath?: Array<0 | 1>, rightPath?: Array<0 | 1>): Tree => {
	const current: Tree = getNode(root, path);
	if (!Array.isArray(current)) return root;
	const [left, right] = current;
	if (path.length >= 4 && current.every(side => !Array.isArray(side))) {
		const leftAdd = leftPath ? updateNode(root,
			(node) => addToSibling(left as number, node, 1), leftPath) : root;
		const rightAdd = rightPath ? updateNode(leftAdd,
			(node) => addToSibling(right as number, node, 0), rightPath) : leftAdd;
		return setNode(rightAdd, 0, path);
	}
	const res = explode(root, [...path, 0], leftPath, [...path, 1]);
	if (!isEqual(res, root)) return res;
	return explode(root, [...path, 1], [...path, 0], rightPath);
}


const treeToString = (root: Tree, path: Array<0 | 1> = []): string => {
	const current: Tree = getNode(root, path);
	if (!Array.isArray(current)) return current >= 10 ? current + "!" : current + "";
	const str = `[${treeToString(root, [...path, 0])}, ${treeToString(root, [...path, 1])}]`;
	return path.length >= 4 ? `${str}!` : str;
}

const reduce = (root: Tree): Tree => {
	const exploded = explode(root);
	if (!isEqual(exploded, root)) return reduce(exploded);
	const splitted = split(root);
	if (!isEqual(splitted, root)) return reduce(splitted);
	return root;
}

const result = nums.reduce((acc, curr) => { return reduce([acc, curr]) });

const magnitude = (node: Tree): number => {
	if (!Array.isArray(node)) return node;
	const [left, right] = node;
	return 3 * magnitude(left) + 2 * magnitude(right);
}

console.log(magnitude(result))