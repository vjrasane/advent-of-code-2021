
import { get, isEqual, minBy, set, inRange, first, padCharsStart, sum } from "lodash/fp";
import { getInputFile, getTestFile, readLines } from "../utils";

const input = readLines(getInputFile(__filename));

const bits = first(input)?.split("")
	.map(
		str => padCharsStart("0", 4, (parseInt(str, 16) >> 0).toString(2))
	).join("") ?? "";

const splitChunk = (len: number, str: string): [string, string] => {
	return [str?.substr(0, len), str?.substr(len)];
}

const splitChunks = (lens: Array<number>, str: string): [Array<number>, string] => {
	return lens.reduce(
		(acc: [Array<number>, string], curr: number): [Array<number>, string] => {
		const [chunks, remaining] = acc;
		const [chunk, _remaining] = splitChunk(curr, remaining);
		return [[...chunks, parseInt(chunk, 2)], _remaining];
	}, [[], str]);
}

enum PacketType {
	Literal = 4,
	Sum = 0,
	Product = 1,
	Minimum = 2,
	Maximum = 3,
	GreaterThan = 5,
	LessThan = 6,
	EqualTo = 7
}

type LiteralPacket = {
	type: PacketType.Literal,
	version: number,
	value: number,
}

type OperatorPacket = {
	type: PacketType.Sum | PacketType.Product | PacketType.Minimum | PacketType.Maximum | PacketType.GreaterThan | PacketType.LessThan | PacketType.EqualTo,
	version: number,
	packets: Array<Packet>
}

type Packet = OperatorPacket | LiteralPacket;

const parseLiteralValue = (str: string): [string, string] => {
	const [chunk, rest] = splitChunk(5, str);
	if (chunk.startsWith("0")) return [chunk.substr(1), rest];
	const [_chunk, _rest] = parseLiteralValue(rest);
	return [chunk.substr(1) + _chunk, _rest];
}

const parseOperatorPackets = (str: string) : [Array<Packet>, string] => {
	const [i, rest] = splitChunk(1, str);
	switch(i) {
		case "0":{
			const [len, _rest] = splitChunk(15, rest);
			const [sub, __rest] = splitChunk(parseInt(len, 2), _rest);
			const [packets] = parsePacketArray(sub);
			return [packets, __rest];
		}
		case "1":
		default: {
			const [len, _rest] = splitChunk(11, rest);
			const [packets, __rest] = parsePacketArray(_rest, parseInt(len, 2));
			return [packets, __rest];
		}
	}
}

const parsePacketArray = (str: string, packets = Infinity): [Array<Packet>, string] => {
	if (!str.length || packets <= 0) return [[], str];
	const [packet, rest] = parsePacket(str);
	const [following, _rest] = parsePacketArray(rest, packets - 1);
	return [[packet, ...following], _rest];
}

const parsePacket = (str: string): [Packet, string] => {
const [[version, type], rest] = splitChunks([3,3], str);
	switch(type) {
		case PacketType.Literal:{
			const [value, _rest] = parseLiteralValue(rest);
			return [{ type, version, value: parseInt(value, 2) }, _rest];}
		default:{
			const [packets, _rest] = parseOperatorPackets(rest);
			return [{ type, version, packets}, _rest]
			}
	}
}

const sumVersions = (packet: Packet): number => {
	switch(packet.type) {
		case PacketType.Literal: {
			return packet.version;
		}
		default:
			return packet.version + sum(packet.packets.map(sumVersions))
	}
}

const [packet] = parsePacket(bits);
console.log(sumVersions(packet))