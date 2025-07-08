import type { Output } from "@cartesi/viem";
import chalk from "chalk";
import { Box, Text } from "ink";
// biome-ignore lint/correctness/noUnusedImports: needs React
import React from "react";

interface Props {
    output: Output;
}

export default function OutputDetail({ output }: Props) {
    const dd = output.decodedData;
    return (
        <Box borderStyle="single" flexDirection="column" flexGrow={1}>
            <Text>Index: {chalk.cyan(output.index.toString())}</Text>
            <Text>Type: {chalk.cyan(dd.type)}</Text>
            {(dd.type === "DelegateCallVoucher" || dd.type === "Voucher") && (
                <Text> Destination: {dd.destination}</Text>
            )}
            {dd.type === "Voucher" && <Text>Value: {dd.value.toString()}</Text>}
            <Text>Payload: {chalk.cyan(dd.payload)}</Text>
            <Text>Hash: {chalk.cyan(output.hash)}</Text>
            <Text>
                Execution Transaction Hash:{" "}
                {chalk.cyan(output.executionTransactionHash)}
            </Text>
            <Text>Raw Data: {chalk.cyan(output.rawData)}</Text>
            <Text>Created: {chalk.cyan(output.createdAt.toISOString())}</Text>
            <Text>Updated: {chalk.cyan(output.updatedAt.toISOString())}</Text>
        </Box>
    );
}
