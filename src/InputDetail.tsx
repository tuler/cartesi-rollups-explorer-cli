import type { Input } from "@cartesi/viem";
import chalk from "chalk";
import { Box, Text } from "ink";
import React from "react";

interface Props {
    input: Input;
}

export default function InputDetail({ input }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column" flexGrow={1}>
            <Text>Index: {chalk.cyan(input.index.toString())}</Text>
            <Text>Status: {chalk.cyan(input.status)}</Text>
            <Text>Machine Hash: {chalk.cyan(input.machineHash || "-")}</Text>
            <Text>Outputs Hash: {chalk.cyan(input.outputsHash || "-")}</Text>
            <Text>
                Transaction Reference: {chalk.cyan(input.transactionReference)}
            </Text>
            <Text>Created: {chalk.cyan(input.createdAt.toISOString())}</Text>
            <Text>Updated: {chalk.cyan(input.updatedAt.toISOString())}</Text>
        </Box>
    );
}
