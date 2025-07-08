import type { Output } from "@cartesi/viem";
import chalk from "chalk";
import { Box, Text } from "ink";
import React from "react";

interface Props {
    output: Output;
}

export default function OutputDetail({ output }: Props) {
    return (
        <Box borderStyle="single" flexDirection="column">
            <Text>Index: {chalk.cyan(output.index.toString())}</Text>
            <Text>
                Created: {chalk.cyan(output.createdAt?.toISOString?.() || "-")}
            </Text>
            <Text>
                Updated: {chalk.cyan(output.updatedAt?.toISOString?.() || "-")}
            </Text>
        </Box>
    );
}
