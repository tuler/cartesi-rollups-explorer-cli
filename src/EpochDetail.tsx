import type { Epoch } from "@cartesi/viem";
import chalk from "chalk";
import { Box, Text } from "ink";
import React from "react";

interface Props {
    epoch: Epoch;
}

export default function EpochDetail({ epoch }: Props) {
    return (
        <Box flexDirection="column" marginBottom={1}>
            <Text>Index: {chalk.cyan(epoch.index.toString())}</Text>
            <Text>
                Virtual Index: {chalk.cyan(epoch.virtualIndex.toString())}
            </Text>
            <Text>Status: {chalk.cyan(epoch.status)}</Text>
            <Text>First Block: {chalk.cyan(epoch.firstBlock.toString())}</Text>
            <Text>Last Block: {chalk.cyan(epoch.lastBlock.toString())}</Text>
            <Text>Claim Hash: {chalk.cyan(epoch.claimHash || "-")}</Text>
            <Text>
                Claim Tx Hash: {chalk.cyan(epoch.claimTransactionHash || "-")}
            </Text>
            <Text>Created: {chalk.cyan(epoch.createdAt.toISOString())}</Text>
            <Text>Updated: {chalk.cyan(epoch.updatedAt.toISOString())}</Text>
        </Box>
    );
}
